import Block from 'core/Block';

import './form.scss';

interface FormProps {
  class?: string;
  onSubmit: () => void;
}

export class Form extends Block {
  static componentName = 'Form';

  constructor(props: FormProps) {
    super(props);
  }

  componentDidMount(): void {
    this.getContent().addEventListener('submit', this.props.onSubmit);
  }

  componentWillUnmount(): void {
    this.getContent().removeEventListener('submit', this.props.onSubmit);
  }

  protected render(): string {
    return `
        <form {{#if class}}class="{{class}}"{{/if}} data-slot="1"></form>
    `;
  }
}
