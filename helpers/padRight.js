module.exports = function(str, symbol, length) {
  const pad = symbol.repeat(length);
  return (str + pad).substring(0, pad.length);
};
