import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as loglevel from 'loglevel';
import * as os from 'os';
import * as path from 'path';

import {httpBaseUrl, proxyBaseUrl} from '../../../test/server/env';
import {spawnProcess} from '../../../test/support/helpers/test_utils';

import {requestBinary, requestBody} from './http_utils';

const log = loglevel.getLogger('webdriver-manager-test');
log.setLevel('debug');

const tmpDir = path.resolve(os.tmpdir(), 'test');
const fileName = path.resolve(tmpDir, 'bar.zip');
const ignoreSSL = true;
const binaryUrl = proxyBaseUrl + '/test/support/files/bar.zip';
const fooJsonUrl = proxyBaseUrl + '/test/support/files/foo_json.json';
const fooArrayUrl = proxyBaseUrl + '/test/support/files/foo_array.json';
const fooXmlUrl = proxyBaseUrl + '/test/support/files/foo.xml';
const barZipSize = 171;
const headers = {
  'host': httpBaseUrl
};
const origTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
let httpProc: childProcess.ChildProcess;
let proxyProc: childProcess.ChildProcess;

describe('binary_utils', () => {  
  beforeAll(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    httpProc = spawnProcess('node', ['dist/test/server/http_server.js']);
    log.debug('http-server: ' + httpProc.pid);
    proxyProc = spawnProcess('node', ['dist/test/server/proxy_server.js']);
    log.debug('proxy-server: ' + proxyProc.pid);
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    try {
      fs.mkdirSync(tmpDir);
      fs.unlinkSync(fileName);
    } catch (err) {
    }
  });

  afterAll(async () => {
    try {
      fs.unlinkSync(fileName);
      fs.rmdirSync(tmpDir);
    } catch (err) {
    }

    process.kill(httpProc.pid);
    process.kill(proxyProc.pid);
    await new Promise(resolve => {
      setTimeout(resolve, 5000);
    });
    jasmine.DEFAULT_TIMEOUT_INTERVAL = origTimeout;
  });

  describe('requestBinary', () => {
    it('should download the file if no file exists or the content lenght ' + 
       'is different', async () => {
      try {
        const result = await requestBinary(
          binaryUrl, {fileName, fileSize: 0, headers, ignoreSSL});
        expect(result).toBeTruthy();
        expect(fs.statSync(fileName).size).toBe(barZipSize);
      } catch (err) {
        fail(err);
      }
    });

    it('should not download the file if the file exists', async () => {
      try {
        const result = await requestBinary(
          binaryUrl, {fileName, fileSize: barZipSize, headers,
          ignoreSSL});
        expect(result).toBeFalsy();
        expect(fs.statSync(fileName).size).toBe(barZipSize);
      } catch (err) {
        fail(err);
      }
    });
  });

  describe('requestBody', () => {
    it('should download a json object file', async () => {
      const foo = await requestBody(fooJsonUrl, {headers, ignoreSSL});
      const fooJson = JSON.parse(foo);
      expect(fooJson['foo']).toBe('abc');
      expect(fooJson['bar']).toBe(123);
    });

    it('should download a json array file', async () => {
      const foo = await requestBody(fooArrayUrl, {headers, ignoreSSL});
      const fooJson = JSON.parse(foo);
      expect(fooJson.length).toBe(3);
      expect(fooJson[0]['foo']).toBe('abc');
      expect(fooJson[1]['foo']).toBe('def');
      expect(fooJson[2]['foo']).toBe('ghi');
    });

    it('should get the xml file', async () => {
      const text = await requestBody(fooXmlUrl, {headers, ignoreSSL});
      expect(text.length).toBeGreaterThan(0);
    });
  });
});