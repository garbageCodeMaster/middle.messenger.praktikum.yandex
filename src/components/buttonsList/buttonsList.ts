import { Block } from 'core';

interface ButtonsListProps {
  ref?: string;
  class?: string;
  onDataChange?: string;
  onPasswordChange?: string;
  onExit?: () => void;
}

export class ButtonsList extends Block {
  static componentName = 'ButtonsList';

  constructor(props: ButtonsListProps) {
    super(props);
  }

  protected render(): string {
    return `
    {{#if noEdit}}
      <div class="about__action">
        <div class="field">
            {{#Button class="effect-button" type="button" onClick=onDataChange}}change data{{/Button}}
        </div>
        <div class="field">
            {{#Button class="effect-button" type="button" onClick=onPasswordChange}}change password{{/Button}}
        </div>
        <div class="field">
            {{#Button class="effect-button effect-button--red" type="button" onClick=onExit}}exit{{/Button}}
        </div>
    {{else}}
        <div class="action">
          {{#Button class="action-button" type="submit"}}Apply{{/Button}}
        </div>
      </div>
    {{/if}}
    `;
  }
}
