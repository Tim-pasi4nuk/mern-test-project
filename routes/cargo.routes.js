const {Router} = require('express')
const shortid = require('shortid')
const Cargo = require('../models/Cargo')
const auth = require('../middleware/auth.middleware')
const router = Router()

// /api/cargo/generate
router.post('/generate', auth, async (req, res) => {
  try {
    const { dateFrom, dateTo, regionFrom, regionTo, cityFrom, cityTo, typeCargo, typeCar0, typeCar1, typeCar2, typeCar3, typeCar4, amountCar, value, valuta, phone, about, capacity, obem, email, userName} = req.body
    const codeCargo = shortid.generate()
    const typeCar = [typeCar0, typeCar1, typeCar2, typeCar3, typeCar4]
    const cargo = new Cargo({ dateFrom, dateTo, regionFrom, regionTo, cityFrom, codeCargo, cityTo, typeCargo, typeCar, amountCar, value, valuta, phone, about, capacity, obem, email, owner: req.user.userId, userName})
    

    await cargo.save(function (err) {
        console.log(err);
    })

    res.status(201).json({ message: 'Объявление груза создано' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    
  }
})

router.get('/',  async (req, res) => {
    
    const cargo = await Cargo.find()
    res.json(cargo)
    try {
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router