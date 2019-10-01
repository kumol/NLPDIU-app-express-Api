var mongoose = require('mongoose');
var paperSchema = mongoose.Schema({
    year: { type : String},
    paper : { type : String }
});
module.exports = mongoose.model("Paper",paperSchema); 