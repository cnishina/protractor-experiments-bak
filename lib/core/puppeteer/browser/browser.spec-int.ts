import * as puppeteer from 'puppeteer-core';
import { Browser } from './browser';

import {getChromium} from '../../../../spec/support/puppeteer_helper';

let executablePath = '';
let session: puppeteer.Browser;

describe('browser puppeteer', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  beforeAll(async () => {
    executablePath = await getChromium();
    session = await puppeteer.launch({
      executablePath,
      headless: false,
      args: ['--no-sandbox'],
    })
  });

  describe('goto', () => {
    it('should work', async () => {
      const page = (await session.pages())[0];
      const browser = new Browser({page});
      await browser.goto('https://github.com');
    });
  });
});