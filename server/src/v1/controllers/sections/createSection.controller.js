const connect = require('../../../config/db.config');
const Section = require('../../models/section.model');
const CustomError = require('./../../../utils/Error');
const CustomSuccess = require('./../../../utils/Success')
const createSection = async (req, res) => {
    try {
        await connect()
        const data = await Section.create(req.body);
        return res.json(CustomSuccess.create({message:"Section is created successfully",data}))

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }
}
module.exports = createSection;