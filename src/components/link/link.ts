import Block from 'core/Block';

import './link.scss';

interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    const onClick = () => {
      
    };

    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `
      <div class="link">
        <a href="{{to}}" class="link-button">{{text}}</a> 
      </div>
    `;
  }
}
