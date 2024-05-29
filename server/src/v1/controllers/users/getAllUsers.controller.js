const connect = require('../../../config/db.config');
const User = require('../../models/user.model');
const CustomError = require('./../../../utils/Error');
const getAllUsers = async (req, res) => {
    try {
        await connect()
        const data = await User.find()
             .sort({ "createdAt": -1 })
             .select('-__v -password')
             .populate('role', '_id name');

        return res.status(201).json({
            message: "Find all user Successfully",
            data,
            success: true
        }) 

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = getAllUsers;