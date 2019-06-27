import { Browser as IBrowser } from '../../interfaces/browser';
import { DirectNavigationOptions, Page } from 'puppeteer';

export class Browser implements IBrowser {
  _page: Page;

  constructor(options: any) {
    this._page = options['page'];
  }

  /**
   * Navigates to the url.
   * @param url
   * @param options casted to DirectNavigationOptions
   * @return A promise when completed.
   */
  async goto(url: string, options?: DirectNavigationOptions): Promise<any> {
    if (!options) {
      options = {waitUntil: 'networkidle2'};
    }
    await this._page.goto(url, options);
  }

  /**
  * Navigates to the url.
  * @param url
  * @param options casted to DirectNavigationOptions
  * @return A promise when completed.
  */
  get = this.goto;

  async getCurrentUrl(): Promise<string> {
    return this._page.url();
  }
}