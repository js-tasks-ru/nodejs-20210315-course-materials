const {pipeline} = require('stream');
const {createReadStream, createWriteStream} = require('fs');
const path = require('path');
const {CaesarCipherEncode} = require("./cipher/caesar-stream");

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const readStream = createReadStream(FILE_NAME);
const writeStream = createWriteStream(`${FILE_NAME}.encoded`);

const encoder = new CaesarCipherEncode(1);

pipeline(
  readStream,
  encoder,
  writeStream,
  (err, data) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log("Done!")
    }
  });

const {promisify} = require('util');
const pipelinePromise = promisify(pipeline);

pipelinePromise(readStream, encoder, writeStream)
  .then(() => console.log("Done!"))
  .catch(err => console.error(err.message));
