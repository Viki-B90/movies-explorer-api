const successMessages = {
  authSuccess: 'Успешная авторизация.',
  movieDeleteSuccess: 'Фильм успешно удален.',
  logoutSuccess: 'Успешный выход',
};

const errorsMessages = {
  serverErrorMessage: 'Ошибка на сервере',
  pageNotFound: 'Страница не найдена.',
  invalidEmail: 'Указана некорректная почта.',
  emailConflict: 'Пользователь с такой почтой уже зарегистрирован.',
  wrongAuth: 'Неправильные почта или пароль пользователя.',
  authRequired: 'Необходима авторизация.',
  wrongToken: 'Неправильный токен. Необходима авторизация.',
  invalidData: 'Переданы некорректные данные.',
  notfoundMovie: 'Фильм не найден.',
  forbiddenMovieDelete: 'Нельзя удалять чужие фильмы.',
};

module.exports = {
  successMessages,
  errorsMessages,
};