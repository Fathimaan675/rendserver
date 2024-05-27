const mongoose = require('mongoose')

mongoose.connect(process.env.server_url).then(
    result=>{
        console.log("Mongodb Atlas connected with Server");
    }
).catch(err=>{
    console.log("Connection Failed!!!");
    console.log(err);
})