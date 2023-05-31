require('dotenv').config();

const {
  PORT = 3000,
  MONGODB_CONNECT = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'test-secret-word',
  NODE_ENV = 'production',
  SALT_ROUNDS = 10,
} = process.env;

module.exports = {
  PORT,
  MONGODB_CONNECT,
  JWT_SECRET,
  NODE_ENV,
  SALT_ROUNDS,
};