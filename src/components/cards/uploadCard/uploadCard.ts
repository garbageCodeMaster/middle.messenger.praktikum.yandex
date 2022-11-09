import Block from 'core/Block';

import '../card.scss';

interface UploadCardProps {
    ref?: string;
    file?: string;
    onClick?: () => void;
    onChange?: () => void;
}

export class UploadCard extends Block {
  static componentName = 'UploadCard';

  constructor({ file, ref, onClick, onChange }: UploadCardProps) {
    super({ file, ref, onClick, onChange });
  }

  protected render(): string {
    return `
        <div class="modal modal--middle">
            <div class="card card-column">
                <h3 class="card__header {{#if error}}card__header--red{{/if}}">
                    Upload the file
                </h3>
                
                <div class="card__main">
                    {{{Label ref="file"}}}

                    <div class="input__wrapper">
                        {{{Input
                            name="file" 
                            type="file" 
                            id="avatar" 
                            class="input input__file" 
                            onChange=onChange
                        }}}
                        <label for="avatar" class="input__file-button">
                            <span class="effect-button like-link">Choose from pc</span>
                        </label>
                    </div>
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
