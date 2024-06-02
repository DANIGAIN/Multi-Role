const express = require('express');
const createMaping = require('../controllers/mapping/createMaping');
const getAllMapings = require('../controllers/mapping/getAllMapings');
const updateMaping = require('../controllers/mapping/updateMaping');
const getMapingByUserRole = require('./../controllers/mapping/getMapingByUserRole')
const {adminMiddleware} = require('./../../middlewares/auth.middleware');


const router = express.Router();

router.post('/mapings', adminMiddleware, createMaping);
router.get('/mapings', adminMiddleware, getAllMapings);
router.put('/mapings/:id',adminMiddleware, updateMaping);
router.get('/mapings/:roleId',adminMiddleware , getMapingByUserRole);

module.exports = router;

