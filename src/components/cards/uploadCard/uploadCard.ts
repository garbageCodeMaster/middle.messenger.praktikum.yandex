import Block from 'core/Block';

import '../card.scss';

interface UploadCardProps {
    ref?: string;
    error?: string;
    onClick?: () => void;
}

export class UploadCard extends Block {
  static componentName = 'UploadCard';

  constructor({ error, ref, onClick }: UploadCardProps) {
    super({ error, ref, onClick });
  }

  protected render(): string {
    return `
        <div class="modal modal--middle">
            <div class="card">
                <h3 class="card__header {{#if error}}card__header--red{{/if}}">
                    Upload the file
                </h3>
                
                <div class="card__main">
                    {{#if file}}
                        <div class="card__main-file">
                            {{file}}
                        </div>
                    {{else}}
                        {{#Button type="effect-button like-link"}}Choose from pc{{/Button}}
                    {{/if}}
                </div>

                <div class="card__action">
                    {{#Button type="action-button" onClick=onClick}}Apply{{/Button}}
                </div>

                {{#if additional}}
                    <h5 class="card__additional {{classAdditional}}">
                        file must be choosen
                    </h5>
                {{/if}}
            </div>
        </div>
        `;
  }
}
