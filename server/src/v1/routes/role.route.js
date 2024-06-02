const express = require('express');
const createRole = require('./../controllers/roles/createRole.controller');
const getAllRoles = require('./../controllers/roles/getAllRoles.controller');
const updateRole = require('./../controllers/roles/updateRole.controller');
const {adminMiddleware} = require('./../../middlewares/auth.middleware');


const router = express.Router();

router.post('/roles',adminMiddleware, createRole);
router.get('/roles',adminMiddleware, getAllRoles);
router.put('/roles/:id',adminMiddleware, updateRole);

module.exports = router;