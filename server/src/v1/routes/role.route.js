const express = require('express');
const createRole = require('./../controllers/roles/createRole.controller');
const getAllRoles = require('./../controllers/roles/getAllRoles.controller');
const updateRole = require('./../controllers/roles/updateRole.controller');

const router = express.Router();

router.post('/roles',createRole);
router.get('/roles',getAllRoles);
router.put('/roles/:id',updateRole);

module.exports = router;