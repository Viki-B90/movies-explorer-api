const allowedCors = [
  'https://api.movies.viki.b.nomoredomains.rocks',
  'http://api.movies.viki.b.nomoredomains.rocks',
  'https://movies.viki.b.nomoredomains.rocks',
  'http://movies.viki.b.nomoredomains.rocks',
  'https://api.nomoreparties.co/beatfilm-movies',
  'http://localhost:3000',
  'http://locahost:3001',
];

function corsOrigins(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const reqHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', reqHeaders);
    return res.end();
  }
  return next();
}

module.exports = corsOrigins;