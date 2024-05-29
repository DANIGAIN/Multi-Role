const mongoose = require('mongoose');
const mapingSchema = new mongoose.Schema({
    componentId:{
        type:mongoose.Types.ObjectId,
        ref:'Compoment'
    },
    RoleId:{
        type:mongoose.Types.ObjectId,
        ref:'Role'
    }
},{
    timestamps:true
})
const RC_Maping = mongoose.models.RCMaping || mongoose.model("RC_Maping", mapingSchema);
module.exports =  RC_Maping;