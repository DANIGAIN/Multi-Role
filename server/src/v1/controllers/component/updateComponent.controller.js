const connect = require('../../../config/db.config');
const Component = require('../../models/component.model');
const CustomError = require('./../../../utils/Error');
const updateComponent = async (req, res) => {
    try {
        await connect()
        const {id} = req.params;
        const data = req.body ;
        await Component.findByIdAndUpdate({_id:id},{$set:data},{new:true});
        return res.status(201).json({
            message: "Component is update Successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = updateComponent;