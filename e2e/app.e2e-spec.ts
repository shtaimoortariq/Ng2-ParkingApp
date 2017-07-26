import { ParkingAppPage } from './app.po';

describe('parking-app App', () => {
  let page: ParkingAppPage;

  beforeEach(() => {
    page = new ParkingAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
