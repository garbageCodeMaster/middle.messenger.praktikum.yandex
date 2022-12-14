import { describe } from 'mocha';
import { expect } from 'chai';
import Block from './Block';

import { JSDOM } from 'jsdom';

const dom: any = new JSDOM('<div class="app"><div>', { url: 'http://localhost' });
global.window = dom.window;
global.document = dom.window.document;

describe('Block testing', () => {

  let isComponentRender = false;
  let isComponentRenderAfterUpdateProps = false;
  
  class TestBlock extends Block {
    constructor(props?: {text: string}) {
      super({
        text: props?.text ?? 'text',
      });
    }

    render() {
      isComponentRender = true;

      if (this.props.text === 'updated-text') {
        isComponentRenderAfterUpdateProps = true;
      }

      return `<div>qqqq</div>`;
    }
  }

  const component = new TestBlock();


  it('Create instance of Block with default props', () => {
    const componentWithDefaultProps = new TestBlock();
    expect(componentWithDefaultProps.props.text).to.eq('text');
  });

  it('Create instance of Block with custom props', () => {
    const componentWithCustomProps = new TestBlock({
      text: 'custom-text',
    });
    expect(componentWithCustomProps.props.text).to.eq('custom-text');
  });

  it('Component did render', () => {
    expect(isComponentRender).to.eq(true);
  });

  it('Update prop', () => {
    component.setProps({
      text: 'updated-text',
    });
    expect(component.props.text).to.eq('updated-text');
  });

  it('Render after update props', () => {
    expect(isComponentRenderAfterUpdateProps).to.eq(true);
  });

  it('Set new prop', () => {
    component.setProps({
      text2: 'new-text2',
    });
    expect(component.props.text2).to.eq('new-text2');
  });

  it('Component has Id', () => {
    expect(component.id).to.be.a('string');
  });

});
