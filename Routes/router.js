const express = require('express');
const buyerController = require('../controller/buyercontroller')
const router = express.Router();
const sellerController = require('../controller/Sellercontroller');
const uploadseller=require('../controller/Uploadsellercontroller')
const propertyController=require('../controller/Uploadsellercontroller')
// Define route for registering a seller
router.post('/register/seller', sellerController.registerSeller);
router.post('/register/buyer',buyerController.register)
router.post('/seller',uploadseller.upload)

router.get('/seller',propertyController.getAllProperties)
module.exports = router;