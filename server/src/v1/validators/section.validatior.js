const {z} = require('zod');
const { emailValidation, passwordValidation, usernameValidation } = require('../../utils/InputValidation');
const loginSchema  = z.object({
    email:emailValidation,
    password:passwordValidation
})

const signupSchema = z.object({
    username:usernameValidation,
    email:emailValidation,
    password:passwordValidation,
    role: z.object({
        id: z.instanceof(mongoose.Types.ObjectId),
        ref: z.literal('Role')
    })
})

module.exports = {
    loginSchema,
    signupSchema
}