const connect = require('../../../config/db.config');
const Role = require('../../models/role.model');
const CustomError = require('./../../../utils/Error');
const createRole = async (req, res) => {
    try {
        await connect()
        const { name } = req.body;

        if (!name) {
            return res.json(CustomError.badRequestError({ message: "Name is required" }))
        }
        const data = await Role.create(req.body);
        return res.status(201).json({
            message: "Role is created Successfully",
            data,
            success: true
        })

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }

}

module.exports = createRole;