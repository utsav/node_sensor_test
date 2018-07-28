const express = require('express');
const router = express.Router();
const temprature = require('./../controllers/temprature');
const sensor = require('./../controllers/sensor');

/* All API routes */

// temprature route
router.post('/temprature', temprature.create);

// sensor route
router.get('/sensors', sensor.get);

module.exports = router;
