import request from '../request';

describe('request', function () {
  test('200', async () => {
    const res = await request('http://baidu.com');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('<html>\n<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">\n</html>\n');
  });

  describe('query', function () {
    test('without ?', async () => {
      const res = await request('https://cvm.tencentcloudapi.com', {
        query: {
          test: 1,
        },
      });

      expect(res.statusCode).toEqual(200);
      expect(res.request.path).toEqual('/?test=1');
      expect(res.body).toContain('MissingParameter');
    });

    test('with ?', async () => {
      const res = await request('https://cvm.tencentcloudapi.com/?a=1', {
        query: {
          test: 1,
        },
      });

      expect(res.statusCode).toEqual(200);
      expect(res.request.path).toEqual('/?a=1&test=1');
      expect(res.body).toContain('MissingParameter');
    });
  });

  describe('headers', function () {
    test('with value', async () => {
      const res = await request('https://cvm.tencentcloudapi.com', {
        headers: {
          'X-HEADER': 'VALUE',
        },
      });

      expect(res.statusCode).toEqual(200);
      expect(res.request.headers['X-HEADER']).toEqual('VALUE');
      expect(res.body).toContain('MissingParameter');
    });

    test('without value', async () => {
      const res = await request('https://cvm.tencentcloudapi.com', {
        headers: {
          'X-HEADER': null,
        },
      });

      expect(res.statusCode).toEqual(200);
      expect(res.request.headers['X-HEADER']).toBeUndefined();
      expect(res.body).toContain('MissingParameter');
    });
  });

  describe('body', function () {
    test('form', async () => {
      const res = await request('https://cvm.tencentcloudapi.com', {
        body: {
          test: 1,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.request.body).toEqual('test=1');
      expect(res.body).toContain('MissingParameter');
    });

    test('json', async () => {
      const res = await request('https://cvm.tencentcloudapi.com', {
        body: {
          test: 1,
        },
        method: 'POST',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.request.body).toEqual('{"test":1}');
      expect(res.body).toContain('InvalidParameter');
    });
  });
});
