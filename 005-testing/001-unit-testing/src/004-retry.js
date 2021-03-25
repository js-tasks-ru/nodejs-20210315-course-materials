
const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

const getCaller = (fn, self, args) => {
  return async () => await fn.apply(self, args);
};

/**
 *
 * @param {number} timeoutMS - timeout to retry in ms
 * @param {function(...args):Promise} fn
 * @param self - "this" that will be passed to the function
 * @param {...object} args - arguments to call
 */
module.exports = (timeoutMS, fn, self, ...args) => {
  const caller = getCaller(fn, self, args);
  return caller()
    .catch(err => delay(timeoutMS).then(() => caller()));
};
