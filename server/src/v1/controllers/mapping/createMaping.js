const connect = require('../../../config/db.config');
const RC_Maping = require('../../models/r_c_maping.model');
const CustomError = require('./../../../utils/Error');
const createMaping = async (req, res) => {
    try {
        await connect()
        const {role , component} = req.body;
        const map = await RC_Maping.findOne({component,role})
        if(map){
            return res.status(401).json(CustomError.badRequestError({message:"Requested map already exist"}))        
        }
        const user =  await RC_Maping.create(req.body);
        const data = await RC_Maping.findOne({_id:user._id})
        .populate('role component' ,'_id name');
       
        return res.status(201).json({
            message: "Maping is created Successfully",
            data,
            success: true
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = createMaping;