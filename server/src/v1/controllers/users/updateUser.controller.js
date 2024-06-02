const jwt = require('jsonwebtoken');
const User = require('./../../models/user.model');
const connect = require('../../../config/db.config');
const CustomError = require('./../../../utils/Error');
const { hashPassword } = require('../../services/auth.service');
const updateUser = async (req, res) => {
    try {
        await connect()
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user || id != user._id) {
            return res.status(404).json(CustomError.notFoundError({ message: "User can not found" }));
        }
        const data = req.body;
        const obj = {};
        if (data?.email) obj.email = data.email;
        if (data?.username) obj.username = data.username;
        if (data?.password) obj.password = await hashPassword(data.password);
        if (data?.role) obj.role = data.role;
        await User.findByIdAndUpdate({ _id: id }, { $set: obj }, { new: true });
        const updateUser = await User.findById(id).populate('role', '_id name');
        jwt.sign({ email: updateUser.email, role: updateUser.role.name, username: updateUser.username }, process.env.JWT_SECRET, {}, (error, token) => {
            if (error) throw error;
            res.cookie('token', token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true,
            }).status(200).json({
                message: "User is updated successfully",
                success: true,
            });;
        });

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = updateUser;