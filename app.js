const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/serverErr');
const router = require('./routes/index');

require('dotenv').config();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(requestLogger);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(serverError);

app.listen(PORT);
