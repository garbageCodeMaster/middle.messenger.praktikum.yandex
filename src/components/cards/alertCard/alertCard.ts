import { Block } from 'core';
import closeUrl from 'icons/cross-x.svg';


interface AlertCardProps {
  type?: "success" | "error";
  message?: string;
}

export class AlertCard extends Block {
  static componentName = 'AlertCard';

  constructor(props: AlertCardProps) {
    super({...props, onClose: () => {this.getContent().remove();} });
  }

  componentDidMount(props: any): void {
    window.store.silentSet({apiMessage: null});

    setTimeout(() => {
      this.getContent().remove();
    }, 2000);
  }

  render(): string {

    return `
    {{#Layout}}
      <div class="alert">
        <div class="card card-raw">
          {{{Label
            type=type
            label=message
          }}}

          {{#Button class="close-button" type="button" onClick=onClose}}
            <img src="${closeUrl}" alt="close" width="24px">
          {{/Button}}
        </div>
      </div>
    {{/Layout}}
    `;
  }
}
