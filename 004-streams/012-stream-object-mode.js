const parse = require('csv-parse');
const {createReadStream} = require('fs');
const {Transform, Writable, pipeline} = require('stream')

class Collector extends Transform {
  #batchSize = 0;
  #buffer = []

  constructor(options = {}) {
    super({
      ...options,
      writableObjectMode: true,
      readableObjectMode: true,
      batchSize: undefined,
    });
    this.#batchSize = options.batchSize
  }

  _transform(record, encoding, callback) {
    this.#buffer.push(record);
    if (this.#isLimitReached()) {
      this.#flushBuffer()
    }
    callback(null)
  }

  _flush(callback) {
    this.#flushBuffer()
    callback(null)
  }

  #isLimitReached() {
    return this.#buffer.length >= this.#batchSize
  }

  #flushBuffer() {
    this.push(this.#buffer);
    this.#buffer = [];
  }
}

class DBBatchWriter extends Writable {

  constructor(options = {}) {
    super({
      ...options,
      objectMode: true,
    })
  }

  _write(batch, encoding, callback) {
    console.log(`Write to DB batch (size: ${batch.length})`);

    callback()
  }
}

const parser = parse({
  columns: ['category0', 'category1', 'category2', 'sku', 'name', 'price', 'quantity', 'manufacturer', 'color'],
  fromLine: 2 // skip the first line with column headers
})

const source = createReadStream('./data/source.csv')

const collector = new Collector({batchSize: 50});

const writer = new DBBatchWriter();

pipeline(
  source,
  parser,
  collector,
  writer,
  err => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Done !');
  }
)
