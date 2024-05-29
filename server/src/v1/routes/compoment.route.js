const express = require('express');
const createComponent = require('./../controllers/component/createComponent.controller');
const getAllComponent = require('./../controllers/component/getAllComponent.controller');
const updateComponent = require('./../controllers/component/updateComponent.controller');

const router = express.Router();

router.post('/components',createComponent);
router.get('/components',getAllComponent);
router.put('/components/:id',updateComponent);

module.exports = router;