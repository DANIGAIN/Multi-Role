const connect = require('../../../config/db.config');
const {hashPassword} = require('./../../services/auth.service');
const CustomError = require('./../../../utils/Error');
const User = require('../../models/user.model');
const createUser = async(req, res) => {
    try {
    await connect()   
    const {email, password,role,username} = req.body;
    const u = await User.findOne({email});
    if(!username || u?.username == username){
        return res.json(CustomError.badRequestError({message:"username is required & unique"}))
    }
    if(!email || u?.email == email){
        return res.json(CustomError.badRequestError({message:"email is required & unique"}))
    }
    if(!password){
        return res.json(CustomError.badRequestError({message:"password is required"}))
    }
    if(!role){
        return res.json(CustomError.badRequestError({message:"role is required"}))
    }
  
    const hash = await hashPassword(password)
    const user = await User.create({email, role, password:hash,username});
    console.log(user);
    const data = await User.findOne({_id:user._id})
        .select('-__v -password')
        .populate('role', '_id name');

    return res.status(201).json({
         message:"User is created successfully",
         data,
         success:true,
    })
    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error))
    }

}

module.exports = createUser;