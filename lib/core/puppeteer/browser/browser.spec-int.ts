import * as puppeteer from 'puppeteer-core';
import { Browser } from './browser';

import { PuppeteerHelper } from '../../../../spec/support/puppeteer_helper';

let puppeteerHelper: PuppeteerHelper = null;
let page: puppeteer.Page = null;

describe('browser puppeteer', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  beforeEach(async () => {
    puppeteerHelper = new PuppeteerHelper();
    page = await puppeteerHelper.getPage();
  });

  afterEach(async () => {
    await puppeteerHelper.close();
  });

  describe('goto', () => {
    it('should navigate to a url and check the current url', async () => {
      const browser = new Browser({page});
      await browser.goto('https://github.com/');
      expect(await browser.getCurrentUrl()).toBe('https://github.com/');
    });
  });
});