module.exports = class {

  constructor(options) {
    this.configure(options);
  }

  configure(options) {
    for (let i in options) {
      if (typeof options[i] !== 'undefined') {
        this[i] = options[i];
      }
    }
  }
};
