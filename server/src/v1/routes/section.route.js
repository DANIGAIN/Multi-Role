const express = require('express');
const createSection = require('./../controllers/sections/createSection.controller');
const getAllSections = require('./../controllers/sections/getAllSections.contrller');
const {adminMiddleware} = require('./../../middlewares/auth.middleware');


const router = express.Router();

router.post('/sections', createSection);
router.get('/sections',adminMiddleware, getAllSections);
  

module.exports = router;     