const mongoose = require('mongoose');
const isURL = require('validator/es/lib/isURL');

const userSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      validate: {
        validator: isURL,
      },
      required: true,
    },
    trailerLink: {
      type: String,
      validate: {
        validator: isURL,
      },
      required: true,
    },
    thumbnail: {
      type: String,
      validate: {
        validator: isURL,
      },
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRu: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('movie', userSchema);
