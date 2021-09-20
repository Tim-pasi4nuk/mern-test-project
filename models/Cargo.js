const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    dateCreate: {type: Date, default: Date.now},
    dateFrom: {type: Date, default: Date.now},
    dateTo: {type: Date, default: Date.now},
    regionFrom:{type: String,default:'Украина'},
    regionTo:{type: String,default:'Украина'},
    cityFrom: {type: String},
    cityTo:{type: String},
    codeCargo:{type:String},
    typeCar:[{type:String, default:'Не указано'}],
    amountCar:{type:Number,default:'1'},
    link:{type:String},
    value:{type:Number,default:'Не указано'},
    valuta:{type:String,default:'UAH'},
    phone:{type:String, default:'Не указано'},
    email:{type:String, default:'Не указано'},
    about:{type:String, default:'Не указано'},
    capacity:{type:String, default:'Не указано'},
    obem:{type:String, default:'Не указано'},
    tag:[{type:String}],
    userName:{type:String}
})

module.exports = model('Cargo', schema)
