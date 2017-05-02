import { NgWysiwygjsPage } from './app.po';

describe('ng-wysiwygjs App', () => {
  let page: NgWysiwygjsPage;

  beforeEach(() => {
    page = new NgWysiwygjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
