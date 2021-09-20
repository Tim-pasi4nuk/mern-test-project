const {Router} = require('express')
const shortid = require('shortid')
const Vehile = require('../models/Vehile')
const auth = require('../middleware/auth.middleware')
const router = Router()

// /api/vehile/addVehile
router.post('/addVehile', auth, async (req, res) => {
  try {
    const { dateFrom, dateTo, regionFrom, regionTo, cityFrom, cityTo, typeCar0, typeCar1, typeCar2, typeCar3, typeCar4, amountCar, value, valuta, phone, about, capacity, obem, email, tag0,tag1} = req.body
    const codeVehile = shortid.generate()
    const tag = [tag0, tag1]
    const typeCar = [typeCar0, typeCar1, typeCar2, typeCar3, typeCar4]
    const vehile = new Vehile({ dateFrom, dateTo, regionFrom, regionTo, cityFrom, codeVehile, cityTo, typeCar, amountCar, value, valuta, phone, about, capacity, obem, email, owner: req.user.userId, tag})
    

    await vehile.save(function (err) {
        console.log(err)
    })

    res.status(201).json({ message: 'Объявление Машины создано' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    
  }
})
router.post('/delete', auth, async (req, res) => {
  try {
    const {id} = req.body
    
  const vehile = await Vehile.findOneAndDelete({_id: id})
  res.status(201).json({message:"Объявление удалено"})
} catch (e) {
  res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
}
})
module.exports = router