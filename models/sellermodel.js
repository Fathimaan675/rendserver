const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true,
     
    }
})

const sellers = mongoose.model("sellers",sellerSchema)

module.exports = sellers