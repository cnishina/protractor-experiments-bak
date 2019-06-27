import { Browser } from './browser';
import { WebDriverBy as By } from './by';
import { buildElement } from './element';


export function build(options: any) {
  const browser = new Browser(options);
  const by = new By();
  const element = buildElement(browser.driver);
  return {
    browser,
    by,
    element
  };
}