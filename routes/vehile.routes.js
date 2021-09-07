const {Router} = require('express')
const shortid = require('shortid')
const Vehile = require('../models/Vehile')
const auth = require('../middleware/auth.middleware')
const router = Router()

// /api/vehile/addVehile
router.post('/addVehile', auth, async (req, res) => {
  try {
    const { dateFrom, dateTo, regionFrom, regionTo, cityFrom, cityTo, typeCar, amountCar, value, valuta, phone, about, capacity, obem, email} = req.body
    const codeVehile = shortid.generate()
    const vehile = new Vehile({ dateFrom, dateTo, regionFrom, regionTo, cityFrom, codeVehile, cityTo, typeCar, amountCar, value, valuta, phone, about, capacity, obem, email, owner: req.user.userId})
    console.log(vehile)

    await vehile.save(function (err) {
        console.log(err);
    })

    res.status(201).json({ message: 'Объявление Машины создано' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    
  }
})
module.exports = router