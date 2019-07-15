export interface ElementFinder {/**
  * Clears the text from an input or textarea web element.
  * @return A promise to this object.
  */
  clear: () => Promise<ElementFinder>;

  /**
   * Clicks on a web element.
   * @return A promise to this object.
   */
  click: () => Promise<ElementFinder>;

  /**
   * The count of web elements.
   * @return A promise of the number of elements matching the locator.
   */
  count: () => Promise<number>;

  /**
   * Compares an element to this one for equality.
   * @param elementFinder The element finder to compare to.
   * @return A promise that will be resolved if they are equal.
   */
  equals: (elementFinder: ElementFinder) => Promise<boolean>;

  /**
   * Gets the value of the provided attribute name.
   * @param attributeName The attribute key.
   * @return A promise to the attribute value.
   */
  getAttribute: (attributeName: string) => Promise<string>;

  /**
   * Gets the tag name of the web element.
   * @return A promise to the tag name.
   */
  getTagName: () => Promise<string>;

  /**
   * Gets the text contents from the html tag.
   * @return A promise to the text.
   */
  getText: () => Promise<string>;
  
  /**
   * Send keys to the input field.
   * @param keys
   * @return A promise to this object.
   */
  sendKeys: (keys: string|number) => Promise<ElementFinder>;
}


/**
 * The interface for the GetElementFinders method.
 */
export interface GetElementFinders extends Function {
  /**
   * @return promise for the element finder array.
   */
  (): Promise<ElementFinder[]>;
}