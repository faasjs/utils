import * as http from 'http';
import * as https from 'https';
import { stringify } from 'querystring';
import * as URL from 'url';
import Logger from './logger';

const log = new Logger('fassjs.utils.request');

interface IOptions {
  method: string;
  headers: any;
  query: any;
  body?: any;
  host?: string;
  path?: string;
}

/**
 * 发起网络请求
 * @memberof Utils
 *
 * @param {string} url 请求路径或完整网址
 * @param {object=} [options={}] 参数和配置
 * @param {string} [options.methd=GET] 请求方法
 * @param {object} [options.query={}] 请求参数，放置于 path 后，若需放置在 body 中，请使用 body 参数
 * @param {object} [options.headers={}] 请求头
 * @param {object=} options.body 请求体
 *
 * @returns {promise}
 */
export default function request(url: string, options: IOptions = {
  headers: {},
  method: 'GET',
  query: {},
}): Promise<any> {
  log.debug('request %s %o', url, options);

  return new Promise((resolve, reject) => {
    options.method = options.method.toUpperCase();

    // 序列化 query
    if (options.query) {
      if (url.indexOf('?') < 0) {
        url += '?';
      } else if (url.substring(url.length - 1) !== '?') {
        url += '&';
      }
      url += stringify(options.query);
      delete options.query;
    }

    // 序列化 body
    let body = options.body;
    if (options.body && typeof options.body !== 'string') {
      if (options.headers && options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        body = stringify(options.body);
      } else if (typeof body !== 'string') {
        body = JSON.stringify(options.body);
      }
    }
    delete options.body;

    // 处理 URL
    const uri = URL.parse(url);
    const protocol = uri.protocol === 'https:' ? https : http;
    if (!options.host) {
      options.host = uri.host;
    }
    if (!options.path) {
      options.path = uri.path;
    }

    // 处理 headers
    for (const key in options.headers) {
      if (typeof options.headers[key] === 'undefined') {
        delete options.headers[key];
      }
    }

    // 包裹请求
    const req = protocol.request(options, (res) => {
      const raw: Buffer[] = [];
      res.on('data', (chunk) => {
        raw.push(chunk);
      });
      res.on('end', async () => {
        const data = Buffer.concat(raw).toString();
        log.timeEnd(url, 'response %s %s %s', res.statusCode, res.headers['content-type'], data);

        const response = Object.create(null);
        response.statusCode = res.statusCode;
        response.headers = res.headers;
        response.body = data;

        try {
          if (response.statusCode >= 200 && response.statusCode < 400) {
            resolve(response);
          } else {
            log.debug('response.error', response);
            reject(response);
          }
        } catch (e) {
          log.error('response.error', e);
          reject(response);
        }
      });
    });

    if (body) {
      req.write(body);
    }

    req.on('error', (e) => {
      log.error('fassjs.utils.request.response.error', e);
      reject(e);
    });

    log.time(url);
    req.end();
  });
}
