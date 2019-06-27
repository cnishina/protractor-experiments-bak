import { Browser } from './browser';
import { seleniumAddress, startServer, startSession, stopServer } from '../../../../spec/support/webdriver_helper'

let seleniumSessionId: string = null;
let browser: Browser = null;

describe('browser webdriver', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  beforeAll(async () => {
    await startServer();
    seleniumSessionId = await startSession();    
  });

  afterAll(async () => {
    await stopServer();
  });

  describe('goto', () => {
    it('should work', async () => {
      browser = new Browser({seleniumAddress, seleniumSessionId})
      await browser.goto('https://github.com');
    });
  });
});