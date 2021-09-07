const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    dateCreate: {type: Date, default: Date.now, required: true},
    dateFrom: {type: Date, default: Date.now, required: true},
    dateTo: {type: Date, default: Date.now, required: true},
    regionFrom:{type: String,default:'Украина'},
    regionTo:{type: String,default:'Украина'},
    cityFrom:{type: String},
    cityTo:{type: String},
    codeVehile: {type: String, required: true, unique: true},
    typeCar:[{type:String,}],
    amountCar: {type: Number, default: 1},
    link:{type:String},
    value:{type:Number},
    valuta:{type:String},    
    phone:{type:String},
    email:{type:String},
    about:{type:String},
    capacity:{type:String},
    obem:{type:String},
    tags:[{type:String}],
    userName:{type:String}
})

module.exports = model('Vehile', schema)
