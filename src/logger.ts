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

class Log {
  public readonly label: string;
  public readonly logger: Logger;
  private cachedTimers: any;

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

  public debug(message: string, ...args: any[]) {
    this.logger.log('debug', message, ...args);
    return this;
  }

  public info(message: string, ...args: any[]) {
    this.logger.log('info', message, ...args);
    return this;
  }

  public warn(message: string, ...args: any[]) {
    this.logger.log('warn', message, ...args);
    return this;
  }

  public error(message: string, ...args: any[]) {
    this.logger.log('error', message, ...args);
    return this;
  }

  public time(key: string, level: ILevel = ILevel.debug) {
    this.cachedTimers[key] = {
      level,
      time: new Date().getTime(),
    };

    return this;
  }

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
