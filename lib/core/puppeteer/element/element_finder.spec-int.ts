import { ElementFinder } from './element_finder';
import { PuppeteerHelper } from '../../../../spec/support/puppeteer_helper';
import { Page } from 'puppeteer';

let puppeteerHelper: PuppeteerHelper = null;
let page: Page = null;
let element: ElementFinder = null;

describe('puppeteer element_finder', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  beforeEach(async () => {
    puppeteerHelper = new PuppeteerHelper();
    page = await puppeteerHelper.getPage();
    await page.goto('https://github.com', {waitUntil: 'networkidle2'});
    element = new ElementFinder();
    element.page = page;
  });

  afterEach(async () => {
    await puppeteerHelper.close();
  });

  describe('ElementFinder', () => {
    describe('click', () => {
      it('should click the element if it exists', async () => {
        element.locator = 'a[href="/join?source=header-home"]';
        await element.click();
        expect(await page.url()).toBe('https://github.com/join?source=header-home');
      });

      it('should fail nicely if the element does not exist', async () => {
        element.locator = 'foobar';
        try {
          const result = await element.click();
          expect(result).toBeNull();
        } catch(err) {
          expect(err).not.toBeNull();
        }
      });
    });

    describe('count', () => {
      it('should get the body count', async () => {
        element.locator = 'body';
        expect(await element.count()).toBe(1);
      });
    });

    describe('equals', () => {
      it('should test equality of elements', async () => {
        element.locator = 'footer';

        let compareElement = new ElementFinder();
        compareElement.page = page;
        compareElement.locator = '.footer'
        expect(await element.equals(compareElement)).toBeTruthy();
      });

      it('should fail when comparing elements that are not equal', async () => {
        element.locator = 'body';

        let compareElement = new ElementFinder();
        compareElement.page = page;
        compareElement.locator = 'footer'
        expect(await element.equals(compareElement)).toBeFalsy();
      })
    });

    describe('getAttribute', () => {
      it('should getAttribute(attributeName)', async () => {
        element.locator = '.bg-gray-dark .container-lg .h1-mktg.text-normal';
        const classes = await element.getAttribute('class');
        expect(classes).toContain('h1-mktg');
        expect(classes).toContain('text-normal');
      });
    });

    describe('getTagName', () => {
      it('should getTagName()', async () => {
        element.locator = '[href="/join?source=header-home"]';
        expect(await element.getTagName()).toBe('a');
        element.locator = '[name="user[login]"]';
        expect(await element.getTagName()).toBe('input');
      });
    });

    describe('getText', () => {
      it('should get the text if the element exists', async () => {
        element.locator = '.bg-gray-dark .container-lg .h1-mktg.text-normal';
        const text = (await element.getText()).trim();
        expect(text).toBe('Get started for free — join the millions of ' +
            'developers already using GitHub to share their code, work together, ' +
            'and build amazing things.');
      });

      it('should fail nicely if the element does not exist', async () => {
        element.locator = 'foobar';
        try {
          const text = await element.getText();
          expect(text).toBe('should not work');
        } catch(err) {
          console.log(err);
          expect(err).not.toBeNull();
        }
      });
    });

    describe('sendKeys', () => {
      it('should sendKeys(text)', async () => {
        element.locator = 'input[name="user[login]"]';
        await element.sendKeys('foobar');
        // TODO(cnishina): add validation.
        await new Promise(resolve => {
          setTimeout(resolve, 5000);
        });
      });
    });
  });
});