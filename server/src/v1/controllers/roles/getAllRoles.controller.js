const connect = require('../../../config/db.config');
const Role = require('../../models/role.model');
const CustomError = require('./../../../utils/Error');
const getAllRoles = async (req, res) => {
    try {
        await connect()
        const data = await Role.find().sort({ "createdAt": -1 }).select('-__v');
        return res.status(201).json({
            message: "Find all roles Successfully",
            data,
            success: true
        }) 

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = getAllRoles;