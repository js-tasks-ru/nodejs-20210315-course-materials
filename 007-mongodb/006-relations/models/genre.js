const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true,
    }
  }
);


genreSchema.virtual('books', {
  localField: '_id',

  ref: 'book',
  foreignField: 'genre',

  justOne: false,
});
const Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;
