const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const rateLimiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const corsOrigins = require('./utils/cors-origins');

const router = require('./routes/index');

const { PORT, MONGODB_CONNECT } = require('./utils/config');

const app = express();
mongoose.connect(MONGODB_CONNECT);

app.use(requestLogger);

app.use(helmet());
app.use(rateLimiter);
app.use(cors(corsOrigins));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`)
})
