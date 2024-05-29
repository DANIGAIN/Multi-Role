const express = require('express');
const loginUser = require('../controllers/users/loginUser.controller');
const createUser = require('./../controllers/users/createUser.controller');
const getAllUsers = require('./../controllers/users/getAllUsers.controller');
const updateUser = require('./../controllers/users/updateUser.controller');
const getProfileUser = require('./../controllers/users/getProfileUser.controller');

const router = express.Router();

router.post('/users', createUser);
router.post('/users/login', loginUser);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.get('/users/profile',getProfileUser);

module.exports = router;

