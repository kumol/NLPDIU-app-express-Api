var mongoose = require('mongoose');
var resourceSchema = mongoose.Schema({
    title : String,
    detail : String,
    name : String,
    date : Date,
    location : String
});
module.exports = mongoose.model('Resource',resourceSchema);