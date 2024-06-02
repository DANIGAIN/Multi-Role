const connect = require('../../../config/db.config');
const RC_Maping = require('../../models/r_c_maping.model');
const CustomError = require('./../../../utils/Error');
const updateMapping = async (req, res) => {
    try {
        await connect()
        const {id} = req.params;
        const data = req.body ;
        await RC_Maping.findByIdAndUpdate({_id:id},{$set:data},{new:true});
        return res.status(201).json({
            message: "RC-maping  is update Successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = updateMapping;