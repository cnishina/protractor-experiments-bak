import { Browser as IBrowser } from '../../interfaces/browser';
import { Session, WebDriver, WebElement } from 'selenium-webdriver';
import { Executor, HttpClient } from 'selenium-webdriver/http';

export class Browser implements IBrowser {
  protected _driver: WebDriver;
  protected _session: Session;

  constructor(options: any) {
    const httpClient = new HttpClient(options['seleniumAddress']);
    const executor = new Executor(httpClient);
    this._session = new Session(options['seleniumSessionId'], null);
    this._driver = new WebDriver(this._session, executor);
  }

  get driver(): WebDriver {
    return this._driver;
  }

  /**
   * Navigates to the url.
   * @param url
   * @return A promise when completed.
   */
  async goto(url: string): Promise<void> {
    await this._driver.get(url);
  }

  /**
   * Navigates to the url.
   * @param url
   * @return A promise when completed.
   */
  get = this.goto;

  /**
   * Get the current url string (includes the http protocol).
   * @return A promise to the current url.
   */
  async getCurrentUrl(): Promise<string> {
    const currentUrl = await this._driver.getCurrentUrl();
    return currentUrl;
  }
}