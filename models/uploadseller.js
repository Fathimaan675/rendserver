const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    place:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    bedrooms:{
        type:String,
        required:true
    },
    bathrooms:{
        type:String,
        required:true
    },
    hospitals:{
        type:String,
        required:true
    }
})

const UploadSellers = mongoose.model("uploadsellers", sellerSchema)

module.exports =UploadSellers;
