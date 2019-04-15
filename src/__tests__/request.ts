import request from '../request';

test('200', async () => {
  const res = await request('http://baidu.com');

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual('<html>\n<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">\n</html>\n');
});
