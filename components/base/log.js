const chalk = require('chalk');

module.exports = class {
  log(message, level = 0, wrapper = null) {
    if (typeof message === 'string') {
      const string = '  '.repeat(level) + message;
      console.log(wrapper ? wrapper(string) : string);
    } else {
      console.log(message);
    }
  }

  error(message, level = 0) {
    this.log(message, level, chalk.red);
  }

  success(message, level = 0) {
    this.log(message, level, chalk.green);
  }

  warning(message, level = 0) {
    this.log(message, level, chalk.yellow);
  }

  notice(message, level = 0) {
    this.log(message, level, chalk.blue);
  }

  info(message, level = 0) {
    this.log(message, level);
  }
};
