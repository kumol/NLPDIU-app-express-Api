var mongoose = require('mongoose');
var memberSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type:String },
    position : { type : String },
    email : { type : String},
    web : { type: String },
    image : { type: String }
});

module.exports = mongoose.model("Member",memberSchema); 