const {encode} = require("./caesar");
const {Transform} = require('stream');

// const t = new Transform({
//   transform(chunk, encoding, callback) {
//   }
// })

class CaesarCipherEncode extends Transform {
  // private shift: number
  #shift = 0;

  constructor(shift) {
    super();
    this.#shift = shift
  }

  /**
   *
   * @param chunk
   * @param encoding 'buffer'|'utf-8'|...
   * @param callback
   * @private
   */
  _transform(chunk, encoding, callback) {
    let data, error;
    try {
      data = encode(this.#shift, chunk.toString())
    } catch (e) {
      error = e;
    }
    callback(error, data);
  }

  // _transform(chunk, encoding, callback) {
  //   const encoded = encode(this.#shift, chunk.toString());
  //   this.push(encoded);
  //   callback();
  // }

  _final(callback) {
    callback();
  }
}

module.exports = {
  CaesarCipherEncode
};
