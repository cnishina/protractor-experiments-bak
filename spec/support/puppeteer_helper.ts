import * as path from 'path';
import * as puppeteer from 'puppeteer-core';
import * as wdm from 'webdriver-manager-replacement';


export class PuppeteerHelper {
  browser: puppeteer.Browser;
  maxVersion = '76';
  outDir = path.resolve('downloads');
  width = 1000;
  height = 720;
  options: wdm.Options = {
    browserDrivers: [
      {
        name: 'chromium',
        maxVersion: this.maxVersion,
      },
    ],
    outDir:this.outDir,
  };

  async getChromium() {
    const outDir = this.outDir;
    const maxVersion = this.maxVersion;
    const chromium = new wdm.Chromium({outDir, maxVersion});
    // TODO(cnishina): Fix this. This should not have to path.resolve with the outDir.
    let binaryPath = path.resolve(outDir, chromium.getBinaryPath());
    if (binaryPath) {
      return binaryPath;
    }
    // TODO(cnishina): Turn back on when we have internet again.
    // Doing this here will delete chromium and re-download it. Should this be a
    // flag to enable or disable?
    // await wdm.update(options);
    return chromium.getBinaryPath();
  }

  async getPage() {
    const executablePath = await this.getChromium();
    const headless = true;
    const width = this.width;
    const height = this.height;
    const args = [`--window-size=${width},${height}`]
    this.browser = await puppeteer.launch({
      executablePath,
      headless,
      args
    });
    const page = (await this.browser.pages())[0];
    await page.setViewport({width, height});
    return page;
  }

  async close() {
    return this.browser.close();
  }
}

