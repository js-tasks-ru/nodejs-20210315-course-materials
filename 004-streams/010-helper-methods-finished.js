const {finished} = require('stream');
const {createReadStream, createWriteStream} = require('fs');
const path = require('path');
const {CaesarCipherEncode} = require("./cipher/caesar-stream");

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const readStream = createReadStream(FILE_NAME);
const writeStream = createWriteStream(`${FILE_NAME}.encoded`);

const encoder = new CaesarCipherEncode(1);

readStream
  .pipe(encoder)
  .pipe(writeStream);

finished(readStream, err => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('ReadStream finished');
  }
});

finished(encoder, err => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Encoder finished');
  }
});

finished(writeStream, err => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('WriteStream finished');
  }
});

const {promisify} = require('util');
finishedPromisify = promisify(finished);

await finishedPromisify(writeStream)
