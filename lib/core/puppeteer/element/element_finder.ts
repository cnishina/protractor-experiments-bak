import { Page } from 'puppeteer-core';
import { ElementFinder as IElementFinder } from '../../interfaces/element';

export class ElementFinder implements IElementFinder {
  page: Page;
  locator: string; // css selector.

  /**
   * Clears the text from an input or textarea web element.
   * @return A promise to this object.
   */
  async clear(): Promise<ElementFinder> {
    await this.page.click(this.locator, {clickCount: 3})
    await this.page.keyboard.press('Backspace')
    return this;
  }

  /**
   * Clicks on a web element.
   * @return A promise to this object.
   */
  async click():  Promise<ElementFinder> {
    await this.page.click(this.locator);
    return this;
  }

  /**
   * The count of web elements.
   * @return A promise of the number of elements matching the locator.
   */
  async count(): Promise<number> {
    const elements = await this.page.$$(this.locator);
    return elements.length;
  }

  /**
   * Compares an element to this one for equality.
   * @param elementFinder The element finder to compare to.
   * @return A promise that will be resolved if they are equal.
   */
  async equals(elementFinder: ElementFinder): Promise<boolean> {
    const e1 = await this.page.$$(this.locator);
    const e2 = await this.page.$$(elementFinder.locator);
    return this.page.evaluate((e1, e2) => e1 === e2, e1[0], e2[0]);
  }

  /**
   * Gets the value of the provided attribute name.
   * @param attributeName The attribute key.
   * @return A promise to the attribute value.
   */
  async getAttribute(attributeName: string): Promise<string> {
    const elements = await this.page.$$(this.locator);
    return this.page.evaluate((element: Element, attributeName: string) => {
        return element.getAttribute(attributeName);
      },
      elements[0], attributeName);
  }

  /**
   * Gets the tag name of the web element.
   * @return A promise to the tag name.
   */
  async getTagName(): Promise<string> {
    const elements = await this.page.$$(this.locator);
    return this.page.evaluate((element: Element) => {
      return element.tagName.toLowerCase();
    }, elements[0]);
  }

  /**
   * Gets the text contents from the html tag.
   * @return A promise to the text.
   */
  async getText(): Promise<string> {
    const elements = await this.page.$$(this.locator);
    return this.page.evaluate((element: Element) => {
      return element.textContent;
    }, elements[0]);
  }

  /**
   * Send keys to the input field.
   * @param keys
   * @return A promise to this object.
   */
  async sendKeys(keys: string|number): Promise<ElementFinder> {
    if (typeof keys === 'number') {
      keys = keys.toString();
    }
    await this.page.type(this.locator, keys);
    return this;
  }
}