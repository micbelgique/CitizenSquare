import { CitizenSquarePage } from './app.po';

describe('citizen-square App', () => {
  let page: CitizenSquarePage;

  beforeEach(() => {
    page = new CitizenSquarePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
