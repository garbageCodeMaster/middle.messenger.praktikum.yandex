import Block from 'core/Block';

import './textarea.scss';

interface TextAreaProps {
  name?: string;
  class?: string;
  placeholder?: string;
  value?: string;
}

export class TextArea extends Block {
  static componentName = 'TextArea';

  constructor({ ...props }: TextAreaProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
    <textarea class="textarea {{class}}" name="{{name}}" {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}></textarea>
    `;
  }
}
