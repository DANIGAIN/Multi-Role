const bcrypt = require('bcrypt');
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (error, solt) => {
            if (error) reject(error);
            bcrypt.hash(password, solt, (err, hash) => {
                if (error) reject(err);
                resolve(hash)
            })
        })
    })
}
const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}
module.exports = {
    comparePassword,
    hashPassword
}