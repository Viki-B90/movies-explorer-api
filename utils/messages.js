const successMessages = {
  authSuccess: 'Успешная авторизация.',
  movieDeleteSuccess: 'Фильм успешно удален.',
  logoutSuccess: 'Успешный выход',
};

const errorsMessages = {
  serverErrorMessage: 'Ошибка на сервере',
  pageNotFound: 'Страница не найдена.',
  emailConflict: 'Пользователь с такой почтой уже зарегистрирован.',
  wrongAuth: 'Неправильные почта или пароль пользователя.',
  authRequired: 'Необходима авторизация.',
  wrongToken: 'Неправильный токен. Необходима авторизация.',
  invalidUserData: 'Переданы некорректные данные для создания пользователя.',
  invalidMovieData: 'Переданы некорректные данные для создания фильма.',
  notfoundMovie: 'Фильм не найден.',
  forbiddenMovieDelete: 'Нельзя удалять чужие фильмы.',
};

module.exports = {
  successMessages,
  errorsMessages,
};