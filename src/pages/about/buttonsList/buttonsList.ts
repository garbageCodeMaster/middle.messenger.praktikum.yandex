import Block from 'core/Block';

interface ButtonsListProps {
  ref?: string;
  class?: string;
  onDataChange?: string;
  onPasswordChange?: string;
  onExit?: string;
  onSubmit?: string;
}

export class ButtonsList extends Block {
  static componentName = 'ButtonsList';

  constructor(props: ButtonsListProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
    {{#if noEdit}}
      <div class="about__action">
        <div class="field">
            {{#Button type="effect-button" onClick=onDataChange}}change data{{/Button}}
        </div>
        <div class="field">
            {{#Button type="effect-button" onClick=onPasswordChange}}change password{{/Button}}
        </div>
        <div class="field">
            {{#Button type="effect-button effect-button--red" onClick=onExit}}exit{{/Button}}
        </div>
    {{else}}
        <div class="action">
          {{#Button type="action-button" onClick=onSubmit}}Apply{{/Button}}
        </div>
      </div>
    {{/if}}
    `;
  }
}
