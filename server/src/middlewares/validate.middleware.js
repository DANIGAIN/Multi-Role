const CustomError = require("../utils/Error")

const validate = (schema) =>  async (req, res, next) =>{
    try{
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next()

    }catch(error){
        const message = error.errors
        return res.status(422).json(CustomError.validationError(message));
    }
}

module.exports = validate ;