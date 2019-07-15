// import { ElementFinder as IElementFinder } from '../../interfaces/element';
// import { By, WebDriver } from 'selenium-webdriver';

// export class ElementFinder implements IElementFinder {
//   driver: WebDriver;
//   locator: string; // css selector.

//   async clear(): Promise<ElementFinder> {
//     const elements = await this.driver.findElements(
//       By.css(this.locator));
//     const element = elements[0];
//     await element.clear();
//     return this;
//   }
//   async click(): Promise<ElementFinder> {
//     const elements = await this.driver.findElements(
//       By.css(this.locator));
//     const element = elements[0];
//     await element.click();
//     return this;
//   }
//   async count(): Promise<number> {
//     const elements = await this.driver.findElements(
//       By.css(this.locator));
//     return elements.length;
//   }
//   async equals(elementFinder: ElementFinder): Promise<boolean> {
//     return true;
//   }
//   async getAttribute(attributeName: string): Promise<string> {
//     return null;
//   }
//   async getTagName(): Promise<string> {
//     return null;
//   }
//   async getText(): Promise<string> {
//     return null;
//   }
//   async sendKeys(keys: string | number): Promise<ElementFinder> {
//     return null;
//   }

// }