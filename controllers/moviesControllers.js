const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundErr');
const BadRequestError = require('../utils/errors/BadRequestErr');
const ForbiddenError = require('../utils/errors/ForbiddenErr');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

/* Добавление фильма */
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректный запрос'));
        return;
      }
      next(err);
    });
};

/* Удаление фильма */
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильма не существует');
    })
    .then((movie) => {
      if (req.user._id !== movie.owner._id.valueOf()) {
        return next(new ForbiddenError('Фильм загружен не Вами, удалить невозможно'));
      }
      return Movie.deleteOne(movieId)
        .then(() => {
          res.send({ data: movie });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный запрос'));
        return;
      }
      next(err);
    });
};
