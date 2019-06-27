import { WebDriver, WebElement } from 'selenium-webdriver';
import { GetWebElements } from '../get_web_elements';
import { isProtractorLocator, Locator } from '../../by/locator';

export function elementArrayFinderFactory(
    driver: WebDriver|WebElement|Promise<WebDriver|WebElement>,
    locator: Locator): ElementArrayFinder {
  let getWebElements: GetWebElements = async (): Promise<WebElement[]> => {
    const awaitedDriver = await driver;
    if (isProtractorLocator(locator)) {
      return locator.findElementsOverride(awaitedDriver, null);
    } else {
      return await awaitedDriver.findElements(locator);
    }
  }
  return new ElementArrayFinder(driver, locator, getWebElements);
}

export class ElementArrayFinder {
  constructor(
    private _driver: WebDriver|WebElement|Promise<WebDriver|WebElement>,
    private _locator: Locator,
    private _getWebElements: GetWebElements) {
  }
}