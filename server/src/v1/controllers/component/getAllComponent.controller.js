const connect = require('../../../config/db.config');
const Component = require('../../models/component.model');
const CustomError = require('./../../../utils/Error');
const getAllComponents = async (req, res) => {
    try {
        await connect()
        const data = await Component.find().sort({ "createdAt": -1 }).select('-__v');
        return res.status(201).json({
            message: "Find all components Successfully",
            data,
            success: true
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = getAllComponents;