const connect = require('../../../config/db.config');
const RC_Maping = require('../../models/r_c_maping.model');
const CustomError = require('./../../../utils/Error');
const getMapingByUserRole = async (req, res) => {
    try {
        await connect()
        const {roleId} = req.params;
        console.log(roleId)
        const data = await RC_Maping.find({role:roleId})
        .populate('role component' ,'_id name isActive');
        return res.status(201).json({
            message: "Find  component by user role Successfully",
            data, 
            success: true
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = getMapingByUserRole;