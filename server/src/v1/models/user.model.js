const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    password:{
        type: String,
    },
    role:{
        type: mongoose.Types.ObjectId,
        ref:'Role'
    }
},{
    timestamps:true
})
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports =  User;