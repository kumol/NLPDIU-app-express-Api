var mongoose = require('mongoose');
var contactSchema = mongoose.Schema({
    name: String,
    email: String,
    number: String,
    message: String
});
module.exports=mongoose.model('Contact',contactSchema);