import { OaPage } from './app.po';

describe('oa App', () => {
  let page: OaPage;

  beforeEach(() => {
    page = new OaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
