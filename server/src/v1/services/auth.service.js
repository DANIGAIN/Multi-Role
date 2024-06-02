const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
const getUser = (token) =>{
    if(!token) return false;
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
}
module.exports = {
    comparePassword,
    hashPassword,
    getUser
}