import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as rimraf from 'rimraf';

import {checkConnectivity} from '../../test/support/helpers/test_utils';
import {ChromeDriver, semanticVersionParser, versionParser} from './chromedriver';
import {convertXmlToVersionList} from './utils/cloud_storage_xml';
import {getVersion} from './utils/version_list';

describe('chromedriver', () => {
  const tmpDir = path.resolve(os.tmpdir(), 'test');

  describe('class ChromeDriver', () => {
    const origTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    beforeAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = origTimeout;
    });

    describe('updateBinary', () => {
      beforeEach(() => {
        try {
          fs.mkdirSync(tmpDir);
        } catch (err) {
        }
      });

      afterEach(() => {
        try {
          rimraf.sync(tmpDir);
        } catch (err) {
        }
      });

      it('should download the latest for MacOS', async () => {
        if (await checkConnectivity('update binary for mac test')) {
          const chromedriver =
              new ChromeDriver({outDir: tmpDir, osType: 'Darwin'});
          await chromedriver.updateBinary();

          const configFile = path.resolve(tmpDir, 'chromedriver.config.json');
          const xmlFile = path.resolve(tmpDir, 'chromedriver.xml');
          expect(fs.statSync(configFile).size).toBeTruthy();
          expect(fs.statSync(xmlFile).size).toBeTruthy();

          const versionList = convertXmlToVersionList(
              xmlFile, '.zip', versionParser, semanticVersionParser);
          const versionObj = getVersion(versionList, 'mac');
          const executableFile =
              path.resolve(tmpDir, 'chromedriver_' + versionObj.version);
          expect(fs.statSync(executableFile).size).toBeTruthy();
        }
      });

      it('should download the latest for Windows x64', async () => {
        if (await checkConnectivity('update binary for win x64 test')) {
          const chromedriver = new ChromeDriver(
              {outDir: tmpDir, osType: 'Windows_NT', osArch: 'x64'});
          await chromedriver.updateBinary();

          const configFile = path.resolve(tmpDir, 'chromedriver.config.json');
          const xmlFile = path.resolve(tmpDir, 'chromedriver.xml');
          expect(fs.statSync(configFile).size).toBeTruthy();
          expect(fs.statSync(xmlFile).size).toBeTruthy();

          const versionList = convertXmlToVersionList(
              xmlFile, '.zip', versionParser, semanticVersionParser);
          const versionObj = getVersion(versionList, 'win32');
          const executableFile = path.resolve(
              tmpDir, 'chromedriver_' + versionObj.version + '.exe');
          expect(fs.statSync(executableFile).size).toBeTruthy();
        }
      });

      it('should download the latest for Windows x32', async () => {
        if (await checkConnectivity('update binary for win x32 test')) {
          const chromedriver = new ChromeDriver(
              {outDir: tmpDir, osType: 'Windows_NT', osArch: 'x32'});
          await chromedriver.updateBinary();

          const configFile = path.resolve(tmpDir, 'chromedriver.config.json');
          const xmlFile = path.resolve(tmpDir, 'chromedriver.xml');
          expect(fs.statSync(configFile).size).toBeTruthy();
          expect(fs.statSync(xmlFile).size).toBeTruthy();

          const versionList = convertXmlToVersionList(
              xmlFile, '.zip', versionParser, semanticVersionParser);
          const versionObj = getVersion(versionList, 'win32');
          const executableFile = path.resolve(
              tmpDir, 'chromedriver_' + versionObj.version + '.exe');
          expect(fs.statSync(executableFile).size).toBeTruthy();
        }
      });

      it('should download the latest for Linux x64', async () => {
        if (await checkConnectivity('update binary for linux x64 test')) {
          const chromedriver = new ChromeDriver(
              {outDir: tmpDir, osType: 'Linux', osArch: 'x64'});
          await chromedriver.updateBinary();

          const configFile = path.resolve(tmpDir, 'chromedriver.config.json');
          const xmlFile = path.resolve(tmpDir, 'chromedriver.xml');
          expect(fs.statSync(configFile).size).toBeTruthy();
          expect(fs.statSync(xmlFile).size).toBeTruthy();

          const versionList = convertXmlToVersionList(
              xmlFile, '.zip', versionParser, semanticVersionParser);
          const versionObj = getVersion(versionList, 'linux64');
          const executableFile =
              path.resolve(tmpDir, 'chromedriver_' + versionObj.version);
          expect(fs.statSync(executableFile).size).toBeTruthy();
        }
      });

      it('should not download for Linux x32', async () => {
        if (await checkConnectivity('update binary for linux x32 test')) {
          const chromedriver = new ChromeDriver(
              {outDir: tmpDir, osType: 'Linux', osArch: 'x32'});
          chromedriver.updateBinary()
              .then(() => {
                expect(false).toBeTruthy();
              })
              .catch(() => {});
        }
      });
    });
  });
});
