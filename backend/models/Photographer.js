const mongoose = require('mongoose');

const PhotographerSchema = new mongoose.Schema({
    email:{type:String,default:""},
    name: {type:String,default:"Photographer Name"},
    specialization:{type:String,default:"Weddings, Portraits"} ,
    fees: {type:String,default:"$500/session"},
    address: {type:String,default:"123 Main St, Springfield"},
    locality: {type:String,default:"Coimbatore"},
    availability: {type:Boolean,default:true},
    profilePicture: {type:String,default:"https://via.placeholder.com/130"},
    samplePhotos: {
        type: [String], // Array of strings
        default: () => Array(6).fill("https://via.placeholder.com/300"), // Default 6 placeholder images
    },
    uniquePhoto: {
        type: String,
        default: "https://via.placeholder.com/400", // Default placeholder for the special photo
    },
    appointments:[]
});

module.exports = mongoose.model('Photographer', PhotographerSchema);