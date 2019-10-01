var mongoose = require('mongoose');
var yearSchema = mongoose.Schema({
    year:String,
});
module.exports = mongoose.model("Year",yearSchema);