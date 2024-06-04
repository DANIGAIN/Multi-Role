const CustomError = require("../../../utils/Error");
const connect = require('../../../config/db.config');

const logoutUser = async(req, res) =>{
   
    try{
       
        const {id} = req.params;
        res.clearCookie('token');
        return res.status(200).json({
            message:'Logout successfully',
            success: true
        })

    }catch(error){
        return res.status(500).json(CustomError.internalServerError(error));
    }

}
module.exports =  logoutUser;