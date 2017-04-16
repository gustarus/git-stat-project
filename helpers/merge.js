module.exports = function(a, b) {
  for (let i in b) {
    if (typeof b[i] !== 'undefined') {
      a[i] = b[i];
    }
  }

  return a;
};
