// import { build } from './';
// import { startSession, startServer, stopServer } from '../../../spec/support/webdriver_helper';


// describe('protractor webdriver', () => {
//   beforeAll(() => {
//     jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
//   });

//   beforeAll(async () => {
//     await startServer();
//   });

//   afterAll(async () => {
//     await stopServer();
//   });

//   it('should be a cool demo', async () => {
//     const seleniumSessionId = await startSession();
//     const option = {
//       seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
//       seleniumSessionId
//     };
//     const protractor = await build(option);
//     const browser = protractor.browser;
//     const by = protractor.by;
//     const element = protractor.element;

//     await browser.get('https://github.com');
//     const text = await element(
//       by.css('.bg-gray-dark .container-lg .h1-mktg.text-normal')).getText();
//     const expectedText = 'Get started for free — join the millions of ' +
//       'developers already using GitHub to share their code, work together, ' +
//       'and build amazing things.';
//     expect(text).toBe(expectedText);

//     await element(by.css('button[type="submit"]')).click();
//     expect (await browser.getCurrentUrl())
//       .toBe('https://github.com/join');
//   });
// });
