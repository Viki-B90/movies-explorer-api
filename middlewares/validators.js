const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/regexp');

module.exports.validateUserCreate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Почта должна быть заполнена обязательно',
      'string.email': 'Указана некорректная почта.',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Требуется пароль.',
    }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Поле Имя должно быть обязательно заполнено',
        'string.min': 'Имя должно содержать от 2-х символов',
        'string.max': 'Имя должно содержать до 30-и символов',
      }),
  }),
});

module.exports.validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Почта должна быть заполнена обязательно',
      'string.email': 'Указана некорректная почта.',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Требуется пароль.',
    }),
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Указана некорректная почта.',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Поле Имя должно быть обязательно заполнено',
        'string.min': 'Имя должно содержать от 2-х символов',
        'string.max': 'Имя должно содержать до 30-и символов',
      }),
  }),
});

module.exports.validateMoviePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    duration: Joi.number().integer().required().messages({
      'any.required': 'Поле должно быть заполнено',
      'number.base': 'Значение должно быть числом.',
    }),
    year: Joi.string().required().length(4).messages({
      'any.required': 'Поле должно быть заполнено',
      'string.length': 'Поле должно содержать 4 цифры.',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    image: Joi.string().required().regex(urlRegExp).messages({
      'any.required': 'Поле должно быть заполнено',
      'string.pattern.base': 'Некорректная ссылка',
    }),
    trailerLink: Joi.string().required().regex(urlRegExp).messages({
      'any.required': 'Поле должно быть заполнено',
      'string.pattern.base': 'Некорректная ссылка',
    }),
    thumbnail: Joi.string().required().regex(urlRegExp).messages({
      'any.required': 'Поле должно быть заполнено',
      'string.pattern.base': 'Некорректная ссылка',
    }),
    movieId: Joi.number().integer().required().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Поле должно быть заполнено',
    }),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});