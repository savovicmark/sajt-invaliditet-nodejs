const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageUpload');

router
    .route('/single')
    .post(imageController.uploadImage, imageController.returnImageName);


module.exports = router;