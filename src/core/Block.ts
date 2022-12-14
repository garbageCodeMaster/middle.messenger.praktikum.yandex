import { nanoid } from 'nanoid';
import EventBus from './EventBus';
import Handlebars from 'handlebars';


interface BlockMeta<P = any> {
  props: P;
}

type BlockEventHandler = (...args: any) => void;
type BlockEvents = Record<string, BlockEventHandler>;
type Events = Values<typeof Block.EVENTS>;

interface BlockProps {
  [key: string]: unknown;
  events?: BlockEvents;
}

export interface BlockClass<P> extends Function {
  new (props: P): Block<BlockProps>;
  componentName?: string;
}

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_CWU: 'flow:component-will-unmount',
  } as const;

  static componentName: string;

  public id = nanoid(6);

  private readonly _meta: BlockMeta;

  protected _element!: HTMLElement;

  protected readonly _props: BlockProps;

  protected children: {[id: string]: Block} = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};

  public refs: Record<string, Block<P>> = {};

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this._meta = {
      props,
    };

    this.getStateFromProps();

    this._props = this._makePropsProxy(props || {} as P);
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this._props);
  }

  _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }

  componentWillUnmount() {}
  
  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  protected getStateFromProps(): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this._props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
    this._checkInDom();
  }

  componentDidMount(props: P) {
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = true;
    if (!response) {
      return;
    }

    this._render();
    this.componentDidUpdate();
  }

  componentDidUpdate() {
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this._props } as P;

    Object.assign(this._props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, { ...this._props });
  };

  get props(): BlockProps {
    return this._props;
  }

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element;
  }

  _makePropsProxy(props: P): any {
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        return true;
      },
      deleteProperty() {
        throw new Error('?????? ??????????????');
      },
    }) as unknown as P;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this._props;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _addEvents() {
    const { events } = this._props;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');
    /**
     * ???????????????? ????????????
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state, ...this._props, children: this.children, refs: this.refs,
    });
    /**
     * ???????????????? ???????????????? ???? ????????????????????
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * ???????? ???????????????? ???? id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
       * ???????????????? ???????????????? ???? component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);

      /**
       * ???????? ?????????????? layout-??, ???????? ?????????????????? ??????????
       */
      const slotContent = content.hasAttribute('data-slot') ? content : content.querySelector('[data-slot="1"]') as HTMLDivElement;

      if (slotContent && stubChilds.length) {
        slotContent.append(...stubChilds);
        delete slotContent.dataset.slot;
      }
    });

    /**
     * ???????????????????? ????????????????
     */
    return fragment.content;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  showModal(target: EventTarget | null) {}
}
