const connect = require('../../../config/db.config');
const Section = require('../../models/section.model');
const CustomError = require('../../../utils/Error');
const CustomSuccess = require('../../../utils/Success')
const getAllSections = async (req, res) => {
    try {
        await connect()
        const data = await Section.find().select('-__v');
        return res.json(CustomSuccess.ok({message:"Get all sections successfully" , data}))

    } catch (error) {
        return res.status(500).json(CustomError.internalServerError(error));
    }
}
module.exports = getAllSections;