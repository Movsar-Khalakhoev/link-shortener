const {body} = require('express-validator')

exports.registerValidator = [
  body('login')
    .normalizeEmail()
    .isEmail()
    .withMessage('Некорректный логин'),
  body('password')
    .isLength({min: 6, max: 48})
    .withMessage('Длина пароля должна быть в пределах от 6 до 48 символов')
]

exports.loginValidator = [
  body('login')
    .normalizeEmail()
    .isEmail()
    .withMessage('Некорректный логин'),
  body('password')
    .exists()
    .withMessage('Введите пароль')
]
