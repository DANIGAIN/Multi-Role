const connect = require('../../../config/db.config');
const Role = require('../../models/role.model');
const CustomError = require('./../../../utils/Error');
const updateRole = async (req, res) => {
    try {
        await connect()
        const {id} = req.params;
        const data = req.body ;
        await Role.findByIdAndUpdate({_id:id},{$set:data}, {new:true});
        return res.status(201).json({
            message: "Role is update Successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = updateRole;