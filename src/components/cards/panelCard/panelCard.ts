import Block from 'core/Block';

import imageUrl from 'icons/image.svg';
import filetextUrl from 'icons/file-text.svg';
import mapmarkerUrl from 'icons/map-marker.svg';

import '../card.scss';

interface PanelCardProps {
    ref?: string;
    error?: string;
}

export class PanelCard extends Block {
  static componentName = 'PanelCard';

  constructor({ error, ref }: PanelCardProps) {
    super({ error, ref });

    this.setProps({
      onPhoto: () => {
        console.log('photo');
      },
      onFile: () => {
        console.log('file');
      },
      onLocation: () => {
        console.log('location');
      },
    });
  }

  protected render(): string {
    return `
        <div class="absolute absolute--top">
            <div class="card">
                {{#Button type="managment-button" onClick=onPhoto}}
                    <img src=${imageUrl} alt="clip">
                    <div class="managment-label">Photo/Video</div>
                {{/Button}}

                {{#Button type="managment-button" onClick=onFile}}
                    <img src=${filetextUrl} alt="clip">
                    <div class="managment-label">File</div>
                {{/Button}}

                {{#Button type="managment-button" onClick=onLocation}}
                    <img src=${mapmarkerUrl} alt="clip">
                    <div class="managment-label">Location</div>
                {{/Button}}
            </div>
        </div>
        `;
  }
}
