/**
 * 日志模块
 * @module logger
 */

import { createLogger, format, Logger, transports } from 'winston';

enum ILevel {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

interface ITimer {
  level: ILevel;
  time: number;
}

/**
 * 日志类
 * @class Log
 */
class Log {
  public readonly label: string;
  public readonly logger: Logger;
  private cachedTimers: any;

  /**
   * 初始化日志
   * @param label {string} 日志前缀
   */
  constructor(label: string) {
    this.label = label;
    this.logger = createLogger({
      format: format.combine(format.label({ label, message: true }), format.colorize({ all: true }), format.splat(),
        format.simple()),
      level: process.env.logLevel || 'debug',
      transports: [new transports.Console()],
    });

    // 当使用 Jest 进行测试且使用 --silent 参数时禁止日志输出
    if (
      !process.env.logLevel &&
      process.env.npm_config_argv &&
      JSON.parse(process.env.npm_config_argv).original.includes('--silent')
    ) {
      this.logger.silent = true;
    }

    this.cachedTimers = {};
  }

  /**
   * 调试级别日志
   * @param message {string} 日志内容
   * @param args {...any=} 内容参数
   */
  public debug(message: string, ...args: any[]) {
    this.logger.log('debug', message, ...args);
    return this;
  }

  /**
   * 信息级别日志
   * @param message {string} 日志内容
   * @param args {...any=} 内容参数
   */
  public info(message: string, ...args: any[]) {
    this.logger.log('info', message, ...args);
    return this;
  }

  /**
   * 警告级别日志
   * @param message {string} 日志内容
   * @param args {...any=} 内容参数
   */
  public warn(message: string, ...args: any[]) {
    this.logger.log('warn', message, ...args);
    return this;
  }

  /**
   * 错误级别日志
   * @param message {string} 日志内容
   * @param args {...any=} 内容参数
   */
  public error(message: string, ...args: any[]) {
    this.logger.log('error', message, ...args);
    return this;
  }

  /**
   * 设置一个计时器
   * @param key {string} 计时器标识
   * @param level [string=debug] 日志级别，支持 debug、info、warn、error
   */
  public time(key: string, level: ILevel = ILevel.debug) {
    this.cachedTimers[key] = {
      level,
      time: new Date().getTime(),
    };

    return this;
  }

  /**
   * 结束计时并显示日志
   * @param key {string} 计时器标识
   * @param message {string} 日志内容
   * @param args {...any=} 内容参数
   */
  public timeEnd(key: string, message: string, ...args: any[]) {
    if (this.cachedTimers[key]) {
      const timer: ITimer = this.cachedTimers[key];

      message = message + ' +%ims';
      args.push(new Date().getTime() - timer.time);

      this[timer.level](message, ...args);

      delete this.cachedTimers[key];
    } else {
      this.error('timeEnd not found key %s', key);
      this.error(message, ...args);
    }
    return this;
  }
}

export default Log;
