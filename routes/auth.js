const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {registerValidator, loginValidator} = require('../utils/validators')
const config = require('config')
const User = require('../models/User')
const {Router} = require('express')
const router = Router()

router.post('/register', registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные'
      })
    }

    const {login, password} = req.body
    const candidate = await User.findOne({login})

    if (candidate) {
      return res.status(400).json({message: 'Пользователь с таким логином уже существует'})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({login, password: hashPassword, links: []})
    await user.save()

    res.status(200).json({message: 'Пользователь создан успешно'})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Server Error'})
  }
})

router.post('/', loginValidator, async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные'
      })
    }

    const {login, password} = req.body
    const user = await User.findOne({login})

    if (!user) {
      return res.status(400).json({message: 'Пользователя с таким логином не существует'})
    }

    const isCorrect = await bcrypt.compare(password, user.password)

    console.log(isCorrect)
    if (!isCorrect) {
      return res.status(400).json({message: 'Неверный пароль'})
    }

    const token = jwt.sign(
      {userId: user.id},
      config.get('JWT_SECRET'),
      {
        expiresIn: '1h'
      }
    )
    return res.status(200).json({token, userId: user.id})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Server Error'})
  }
})

module.exports = router
