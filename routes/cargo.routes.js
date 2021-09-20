const {Router} = require('express')
const shortid = require('shortid')
const Cargo = require('../models/Cargo')
const auth = require('../middleware/auth.middleware')
const router = Router()

// /api/cargo/generate
router.post('/generate', auth, async (req, res) => {
  try {
    const { dateFrom, dateTo, regionFrom, regionTo, cityFrom, cityTo, typeCargo, typeCar0, typeCar1, typeCar2, typeCar3, typeCar4, amountCar, value, valuta, phone, about, capacity, obem, email, userName, tag0, tag1} = req.body
    const codeCargo = shortid.generate()
    const tag = [tag0, tag1]
    const typeCar = [typeCar0, typeCar1, typeCar2, typeCar3, typeCar4]
    const cargo = new Cargo({ dateFrom, dateTo, regionFrom, regionTo, cityFrom, codeCargo, cityTo, typeCargo, typeCar, amountCar, value, valuta, phone, about, capacity, obem, email, owner: req.user.userId, userName, tag})
    
    console.log(cargo)
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
    for (var car in cargo) {
      if(cargo[car].dateTo< Date.now()){
        cargo[car].remove()
        console.log(cargo[car])
      }
      
    }
    res.json(cargo)
    try {
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
  router.post('/delete', auth,  async (req, res) => {
    
      try {
        const {id} = req.body
      const cargo = await Cargo.findOneAndDelete({_id: id})
      res.status(201).json({message:"Объявление удалено"})
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router