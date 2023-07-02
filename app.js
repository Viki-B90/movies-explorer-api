require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimiter = require('./middlewares/rateLimit');
const { userRoutes } = require('./routes/users');
const { movieRoutes } = require('./routes/movies');
const { signRoutes } = require('./routes/sign');
const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const corsOrigins = require('./utils/cors-origins');
const { NotFoundError } = require('./errors/index-errors');
const messages = require('./utils/messages');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_DATABASE, NODE_ENV } = process.env;

const app = express();

app.use(express.json());

app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);
app.use(cors(corsOrigins));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', signRoutes);

app.use(auth);

app.use('/', userRoutes);
app.use('/', movieRoutes);

app.use((req, res, next) => {
  next(new NotFoundError(messages.errorsMessages.pageNotFound));
});

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DB_DATABASE : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
  console.log(`Приложение слушает порт ${PORT}`);
}
main();
