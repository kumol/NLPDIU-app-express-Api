var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    userName : { type : String },
    email : { type : String },
    password : { type : String }
});
module.exports = mongoose.model('User',userSchema);