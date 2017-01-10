import { DataStoryPage } from './app.po';

describe('data-story App', function() {
  let page: DataStoryPage;

  beforeEach(() => {
    page = new DataStoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
