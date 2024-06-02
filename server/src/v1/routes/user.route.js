const express = require('express');
const loginUser = require('../controllers/users/loginUser.controller');
const createUser = require('./../controllers/users/createUser.controller');
const getAllUsers = require('./../controllers/users/getAllUsers.controller');
const updateUser = require('./../controllers/users/updateUser.controller');
const getProfileUser = require('./../controllers/users/getProfileUser.controller');
const getUser = require('./../controllers/users/getUser.controller');
const {adminMiddleware} = require('./../../middlewares/auth.middleware');


const router = express.Router();

router.post('/users', adminMiddleware, createUser);
router.post('/users/login', loginUser);
router.get('/users',adminMiddleware, getAllUsers);
router.put('/users/:id',adminMiddleware, updateUser);
router.get('/users/profile',getProfileUser);
router.get('/users/:id',adminMiddleware, getUser);

module.exports = router;

