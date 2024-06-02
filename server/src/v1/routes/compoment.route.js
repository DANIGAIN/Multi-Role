const express = require('express');
const createComponent = require('./../controllers/component/createComponent.controller');
const getAllComponent = require('./../controllers/component/getAllComponent.controller');
const updateComponent = require('./../controllers/component/updateComponent.controller');
const {adminMiddleware} = require('./../../middlewares/auth.middleware');

const router = express.Router();

router.post('/components', adminMiddleware, createComponent);
router.get('/components', adminMiddleware, getAllComponent);
router.put('/components/:id', adminMiddleware, updateComponent);

module.exports = router;