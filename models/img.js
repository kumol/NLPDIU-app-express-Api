var mongoose = require('mongoose');
var iSchema = mongoose.Schema({
    image:String,
});
module.exports = mongoose.model("Im",iSchema);