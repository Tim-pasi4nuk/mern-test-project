const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      })
    }
    const {email, password, phone, userName} = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword, phone, userName })

    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
     
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему8'
      })
    }
    

    const {email, password} = req.body
    if(!email){
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '24h' }
    )
    
    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/checkSub', auth, async (req, res) => {
   try{
  let subscribe = false
  const user = await User.findOne({  _id: req.user.userId })
  const dateSubscribeUser = user.dateSubscribe
    if(dateSubscribeUser > Date.now()){
      subscribe = true
      user.subscribe = subscribe
      await user.save()
    }
    else{
      subscribe = false
        await user.save()
    }
    user.subscribe=subscribe
    console.log(subscribe)
    res.json({IsSub:subscribe})
  }
  catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    console.log(e)
  }
})

router.post('/getSub', auth, async (req, res) => {
  try{
    let date = new Date()
    const user = await User.findOne({  _id: req.user.userId })
    user.dateSubscribe = date.setMonth(date.getMonth() + 1)
    user.subscribe=true
    user.save()
    res.status(201).json({ message: 'Пописка активирована' })
  }
  catch(e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    console.log(e)
  }
})

router.post('/userInfo', auth, async (req, res) => {
  const user = await User.findOne({  _id: req.user.userId })
  console.log(user)
  res.json({user})
})

module.exports = router