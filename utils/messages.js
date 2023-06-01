const successMessages = {
  authSuccess: 'Успешная авторизация.',
  movieDeleteSuccess: 'Фильм успешно удален.',
  logoutSuccess: 'Успешный выход',
};

const errorsMessages = {
  serverErrorMessage: 'Ошибка на сервере',
  pageNotFound: 'Страница не найдена.',
  emailRequired: 'Почта должна быть обязательно указана.',
  invalidEmail: 'Указана некорректная почта.',
  emailConflict: 'Пользователь с такой почтой уже зарегистрирован.',
  passwordRequired: 'Требуется пароль.',
  wrongAuth: 'Неправильные почта или пароль пользователя.',
  authRequired: 'Необходима авторизация.',
  wrongToken: 'Неправильный токен. Необходима авторизация.',
  invalidUserData: 'Переданы некорректные данные для создания пользователя.',
  invalidUserId: 'Передан не корректный Id пользователя.',
  userNameRequired: 'Должно быть указано имя пользователя.',
  userNameLength: 'Имя должно содержать от 2-х до 30-и символов',
  invalidMovieData: 'Переданы некорректные данные для создания фильма.',
  notfoundMovie: 'Фильм не найден.',
  forbiddenMovieDelete: 'Нельзя удалять чужие фильмы.',
};

module.exports = {
  successMessages,
  errorsMessages,
};