'use strict';

module.exports = class {

  constructor(options) {
    this.configure(options);
  }

  configure(options) {
    for (let i in options) {
      this[i] = options[i];
    }
  }
};
