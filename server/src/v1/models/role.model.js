const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim:true
    },
    isActive:{
        type:Boolean,
        required: true,
    }
},{   
    timestamps:true    
})
const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
module.exports =  Role;