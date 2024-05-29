const mongoose = require('mongoose')

const connect = async() => {
    try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log("db connected successfully")
    }catch(error){
        console.log("something have an error" + error.message);
    }
}    

module.exports = connect;