import { TimeTrackerPage } from './app.po';

describe('time-tracker App', () => {
  let page: TimeTrackerPage;

  beforeEach(() => {
    page = new TimeTrackerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
