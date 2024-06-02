const {getUser} = require('./../v1/services/auth.service');
const CustomError = require('./../utils/Error');
const adminMiddleware = async(req, res, next) => {
    const {token}  = req.cookies;
    if(!token){
         return res.status(401).json(CustomError.unauthorizeError({message:"unauthorize !User can not login"}))
    }
    const user = await getUser(token);
    if(user.role != 'Supper-Admin'){
         return res.status(403).json(CustomError.unauthorizeError({message:"Forbedden! your role can not allow access !."}))
    }
    next();
}

module.exports = { 
    adminMiddleware
};