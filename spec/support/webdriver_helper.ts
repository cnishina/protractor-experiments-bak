import { Builder, WebDriver } from 'selenium-webdriver';
import * as wdm from 'webdriver-manager-replacement';

export async function startServer(): Promise<void> {
  await wdm.update(options);
  await wdm.start(options);
}

export async function startSession(): Promise<string> {
  const driver = await getWebDriver();
  const session = await driver.getSession();
  return session.getId();
}

export async function getWebDriver(): Promise<WebDriver> {
  const builder = new Builder()
    .usingServer(seleniumAddress)
    .withCapabilities(capabilities);
  return builder.build();
}

export async function stopServer() {
  await wdm.shutdown(options);
}

const options: wdm.Options = {
  browserDrivers: [
    {
      name: 'chromedriver',
      maxVersion: '75',
    },
  ],
  server: {
    name: 'selenium',
    port: 4444,
    runAsDetach: true,
    runAsNode: true
  },
  outDir: 'downloads'
};

export const capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--disable-gpu']
  },
};

export const seleniumAddress = 'http://127.0.0.1:4444/wd/hub';