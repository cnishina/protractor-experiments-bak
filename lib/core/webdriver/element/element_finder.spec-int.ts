import { WebElement } from 'selenium-webdriver';
import { WebDriverBy as By } from '../by';

import { getWebDriver, startServer, stopServer } from '../../../../spec/support/webdriver_helper'
import { ElementFinder } from './element_finder';

describe('element_finder webdriver', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it('should getText', async () => {
    const webdriver = await getWebDriver();
    await webdriver.get('https://github.com');
    
    const by = new By();
    const locator = by.css('.bg-gray-dark .container-lg .h1-mktg.text-normal');
    const getWebElements = async (): Promise<WebElement[]> => {
      return webdriver.findElements(locator);
    };
    const element = new ElementFinder(webdriver, locator, getWebElements);
    const expectedText = 'Get started for free — join the millions of ' + 
      'developers already using GitHub to share their code, work together, ' +
      'and build amazing things.';
    const text = await element.getText();
    expect(text).toBe(expectedText);
    await webdriver.close();
  });   
});