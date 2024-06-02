const connect = require('../../../config/db.config');
const RC_Maping = require('../../models/r_c_maping.model');
const CustomError = require('./../../../utils/Error');
const getAllMapings = async (req, res) => {
    try {
        await connect()
        const data = await RC_Maping.find()
        .populate('role component' ,'_id name')
        .sort({ "createdAt": -1 }).select('-__v')
        .exec();
        return res.status(201).json({
            message: "Find all components Successfully",
            data,
            success: true
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = getAllMapings;