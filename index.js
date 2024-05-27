require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
// pfServer.use('/Uploads',express.static('./Uploads'))

const PORT = 3001 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Rentify Server Started at PORT : ${PORT}`);
})

// http://localhost:3000/
pfServer.get("/",(req,res)=>{
    res.status(200).send(`Rentify Server started and waiting for client reques</h1>`)
})