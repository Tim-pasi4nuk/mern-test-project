const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref:'Link'}],
    subscribe:{type:Boolean, default:false, required: true},
    dateSubscribe:{type:Date, default:Date.now(), required: true},
    phone:{type:String},
    userName:{type:String}
})

module.exports = model('User', schema)