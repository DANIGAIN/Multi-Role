const mongoose = require('mongoose');
const sectionSchema = new mongoose.Schema({
    route:{
        type:String,
        require: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim:true,
        maxLenght:200,
    },
    description:{
        type:String,
        required: true,
        maxLenght:1000,
        minLanght:2,
    }
},{   
    timestamps:true    
})
const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema);
module.exports =  Section;