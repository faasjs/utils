import * as http from 'http';
import * as https from 'https';
import { stringify } from 'querystring';
import * as URL from 'url';
import Logger from './logger';

const log = new Logger('faasjs.utils.request');

/**
 * 发起网络请求
 * @param {string} url 请求路径或完整网址
 * @param {object=} [options={}] 参数和配置
 * @param {string} [options.methd=GET] 请求方法
 * @param {object} [options.query={}] 请求参数，放置于 path 后，若需放置在 body 中，请使用 body 参数
 * @param {object} [options.headers={}] 请求头
 * @param {object=} options.body 请求体
 *
 * @returns {promise}
 */
export default function request(url: string, {
  headers,
  method,
  query,
  body,
}: {
  headers?: http.OutgoingHttpHeaders,
  method?: string,
  query?: http.OutgoingHttpHeaders,
  body?: http.OutgoingHttpHeaders | string,
} = {
    headers: {},
    query: {},
  }): Promise<any> {
  log.debug('request %s %o', url, {
    body, headers, method, query,
  });

  // 序列化 query
  if (query) {
    if (url.indexOf('?') < 0) {
      url += '?';
    } else if (url.substring(url.length - 1) !== '?') {
      url += '&';
    }
    url += stringify(query);
  }

  // 处理 URL 并生成 options
  const uri = URL.parse(url);
  const protocol = uri.protocol === 'https:' ? https : http;

  const options: {
    method: string,
    headers: http.OutgoingHttpHeaders,
    query: http.OutgoingHttpHeaders,
    host: string,
    path: string,
  } = {
    headers: {},
    host: uri.host!,
    method: method ? method.toUpperCase() : 'GET',
    path: uri.path!,
    query: {},
  };

  // 处理 headers
  for (const key in headers) {
    if (typeof headers[key] !== 'undefined' && headers[key] !== null) {
      options.headers[key] = headers[key];
    }
  }

  // 序列化 body
  if (body && typeof body !== 'string') {
    if (
      options.headers['Content-Type'] &&
      options.headers['Content-Type']!.toString().includes('application/x-www-form-urlencoded')
    ) {
      body = stringify(body);
    } else {
      body = JSON.stringify(body);
    }
  }

  return new Promise((resolve, reject) => {
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
        response.request = options;
        response.request.body = body;
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
      log.error('response.error', e);
      reject(e);
    });

    // 发送请求
    log.time(url);
    req.end();
  });
}
