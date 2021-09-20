const {Router} = require('express')
const Vehile = require('../models/Vehile')
const Cargo = require('../models/Cargo')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.post('/getListCargo', auth, async (req, res) => {
    try {
        const links = await Cargo.find({  owner: req.user.userId })
        res.json(links)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
    })

router.post('/getListVehile', auth, async (req, res) => {
    try {
        const links = await Vehile.find({  owner: req.user.userId })
        res.json(links)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

// /api/search/
router.post('/',  async (req, res) => {
    try {
        const carg = await Cargo.find()
        for (var car in carg) {
            if(Date.parse(carg[car].dateTo)+86400000 < Date.now()){
              carg[car].remove()
              console.log(carg[car])
            }
            
          }
          const vehil = await Vehile.find()
        for (var car in vehil) {
            
            console.log('deleted',Date.parse(vehil[car].dateTo)+86400000, Date.now() )
            if(Date.parse(vehil[car].dateTo)+86400000 < Date.now()){
                console.log('deleted',Date.parse(vehil[car].dateTo)+86400000, Date.now() )
              vehil[car].remove()
            }
            
          }
        const {regionFrom, regionTo, cityFrom, cityTo, typeList} = req.body

        if(typeList==="cargo"){
            if(regionFrom==="Украина"&&regionTo==="Украина"){
                const cargo = await Cargo.find()
                res.json(cargo)
            }
            if(regionFrom==="Украина"){
                const cargo = await Cargo.find({ regionTo: regionTo })
                res.json(cargo)
            }
                
            if(regionTo==="Украина"){
                const cargo = await Cargo.find({ regionFrom: regionFrom })
                res.json(cargo)
            }
            const cargo = await Cargo.find().or([{ regionTo: regionTo}, {regionFrom: regionFrom }])
            res.json(cargo)
        }

        if(typeList==="vehile"){
            if(regionFrom==="Украина"&&regionTo==="Украина"){
                const vehile = await Vehile.find()
                res.json(vehile)
            }
            if(regionFrom.trim()==="Украина"){
                const vehile = await Vehile.find({ regionTo: regionTo })
                res.json(vehile)
            }
                
            if(regionTo.trim()==="Украина"){
                const vehile = await Vehile.find({ regionFrom: regionFrom })
                res.json(vehile)
            }
            const vehile = await Vehile.find().or([{regionTo: regionTo}, {regionFrom: regionFrom }])
            res.json(vehile)
        }
        // if(typeList==="cargo"){
        //     if(regionFrom==="Украина"){
        //         if(regionTo==="Украина"){
        //             const cargo = await Cargo.find()
        //             res.json(cargo)
        //         }
        //         if(!cityTo){
        //             const cargo = await Cargo.find({ cityTo: cityTo })
        //             res.json(cargo)
        //         }
        //         const cargo = await Cargo.find({ regionTo: regionTo })
        //         res.json(cargo)
                
        //     }
        //     else{
        //         if(regionTo==="Украина"){
        //             if(!cityFrom){
        //                 const cargo = await Cargo.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo).where('cityTo').equals(cityTo)
        //                 res.json(cargo)
        //             }
        //             const cargo = await Cargo.find({regionFrom:regionFrom})
        //             res.json(cargo)
        //         }
        //         else{
        //             if(!cityTo){
        //                 if(!cityFrom){
        //                     const cargo = await Cargo.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo)
        //                     res.json(cargo)
        //                 }
        //                 else{
        //                     const cargo = await Cargo.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo).where('cityFrom').equals(cityFrom)
        //                     res.json(cargo)
        //                 } 
        //             }
        //             if(!cityFrom){
        //                 const cargo = await Cargo.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo).where('cityTo').equals(cityTo)
        //                 res.json(cargo)
        //             }
        //             const cargo = await Cargo.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo).where('cityTo').equals(cityTo).where('cityFrom').equals(city)
        //             res.json(cargo)
        //         }
        //     }
        //     const cargo = await Cargo.find()
        //     console.log(cargo)
        //     res.json(cargo)
        // }

        // if(typeList==="vehile"){
        //     if(regionFrom==="Украина"){
        //         if(regionTo==="Украина"){
        //             const cargo = await Vehile.find()
        //             res.json(cargo)
        //         }
        //         if(!cityTo){
        //             const cargo = await Vehile.find({ cityTo: cityTo })
        //             res.json(cargo)
        //         }
        //         const cargo = await Vehile.find({ regionTo: regionTo })
        //         res.json(cargo)
        //     }
        //     else{
        //         if(regionTo==="Украина"){
        //             if(!cityFrom){
        //                 const cargo = await Vehile.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo).where('cityTo').equals(cityTo)
        //                 res.json(cargo)
        //             }
        //             const cargo = await Vehile.find({regionFrom:regionFrom})
        //             res.json(cargo)
        //         }
        //         else{
        //             if(!cityTo){
        //                 if(!cityFrom){
        //                     const cargo = await Vehile.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo)
        //                     res.json(cargo)
        //                 }
        //                 else{
        //                     const cargo = await Vehile.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo).where('cityFrom').equals(cityFrom)
        //                     res.json(cargo)
        //                 } 
        //             }
        //             if(!cityFrom){
        //                 const cargo = await Vehile.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo).where('cityTo').equals(cityTo)
        //                 res.json(cargo)
        //             }
        //             const cargo = await Vehile.find().where('regionFrom').equals(regionFrom).where('regionTo').equals(regionTo).where('cityTo').equals(cityTo).where('cityFrom').equals(city)
        //             res.json(cargo)
        //         }
        //     }
        //     const cargo = await Vehile.find()
        //     console.log(cargo)
        //     res.json(cargo)
        // }

        res.status(400).json({message:'Неверный поиск'})
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router