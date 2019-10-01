var mongoose = require('mongoose');
var dataSchema = mongoose.Schema({
    title: String,
    about_us: String,
    event:String,
    publication:String,
    apublication:String,
    copyright:String,
    member:String,
    faculty:String,
    phd:String,
    master:String,
    undergraduate:String,
    alumna:String,
    ctitle:String,
    jtitle:String,
    jlink:String,
});
module.exports = mongoose.model("Data",dataSchema);