import { CutedogsPage } from './app.po';

describe('cutedogs App', function() {
  let page: CutedogsPage;

  beforeEach(() => {
    page = new CutedogsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
