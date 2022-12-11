import { expect } from 'chai';
import {PathRouter} from './PathRouter';
import Block from './Block';

describe('Router testing', () => {
  const router = new PathRouter();

  class Page1 extends Block {}
  class Page2 extends Block {}
  class Page3 extends Block {}

  router
    .use('/', () => {})
    .use('/2', () => {})
    .use('/3', () => {})
    .start();

  it("Method use works correctly", () => {
    const router = new PathRouter();
    const result = router.use("/2", Page2);

    expect(result).to.eq(router);
  });

  it("Method go sends exact url", () => {
    const expectedResult = "/3";
    new PathRouter().go(expectedResult);

    expect(window.location.href).be.eq(`http://localhost${expectedResult}`);
  });


  it("Method back works correctly", done => {
    const expectedResult = "http://localhost/";
    router.back();

    window.onpopstate = () => {
      expect(window.location.href).be.eq(expectedResult);
      done();
    };
  });
});
