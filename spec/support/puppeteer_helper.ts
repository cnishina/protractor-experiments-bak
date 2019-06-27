import * as wdm from 'webdriver-manager-replacement';

const maxVersion = '75';
const outDir = 'downloads';

const options: wdm.Options = {
  browserDrivers: [
    {
      name: 'chromium',
      maxVersion,
    },
  ],
  outDir,
};

export async function getChromium() {
  const chromium = new wdm.Chromium({outDir, maxVersion});
  let binaryPath = chromium.getBinaryPath();
  if (binaryPath) {
    return binaryPath;
  }
  await wdm.update(options);
  return chromium.getBinaryPath();
}