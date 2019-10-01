var mongoose = require('mongoose');
researchSchema = mongoose.Schema({
    research:String,
});
module.exports = mongoose.model("Research",researchSchema);