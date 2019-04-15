import { Writable } from 'stream';
import Logger from '../logger';

let lastMessage = '';

class MockTransport extends Writable {
  public log() { }

  public _write(message: any) {
    lastMessage = message.message;
  }
}

test('with label', () => {
  const logger = new Logger('label');
  const mockTransport = new MockTransport({ objectMode: true });
  logger
    .addTransport(mockTransport)
    .info('test');

  expect(lastMessage).toEqual('\u001b[32m    [label] test\u001b[39m');
});

test('without label', () => {
  const logger = new Logger();
  const mockTransport = new MockTransport({ objectMode: true });
  logger
    .addTransport(mockTransport)
    .info('test');

  expect(lastMessage).toEqual('\u001b[32m    test\u001b[39m');
});

test('setLabel', () => {
  const logger = new Logger('label');
  const mockTransport = new MockTransport({ objectMode: true });
  logger
    .addTransport(mockTransport)
    .setLabel('newLabel')
    .info('test');

  expect(lastMessage).toEqual('\u001b[32m    [newLabel] test\u001b[39m');
});
