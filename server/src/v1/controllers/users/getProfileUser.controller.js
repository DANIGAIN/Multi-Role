const connect = require('../../../config/db.config');
const jwt = require('jsonwebtoken');
const CustomError = require('./../../../utils/Error');
const getprofileUser = async (req, res) => {
    try {
        await connect()
        const {token} = await req.cookies;   
        if(!token){
            return res.status(404).json({
                data:null,
                success:false,
                message:"User can not exists"
            })
        }
        
        const user = await jwt.verify(token , process.env.JWT_SECRET);
        return res.status(200).json({
            data:user,
            success:true,  
            message:"Find current user"
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = getprofileUser;