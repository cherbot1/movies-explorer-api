const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/serverErr');
const { DEV_DB_CONN } = require('./utils/config');
const router = require('./routes/index');

const { NODE_ENV, DB_CONN } = process.env;

require('dotenv').config();

const { PORT = 3000 } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_CONN : DEV_DB_CONN, {
  useNewUrlParser: true,
});

const app = express();

app.use(requestLogger);

app.use(helmet());

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(serverError);

app.listen(PORT);
