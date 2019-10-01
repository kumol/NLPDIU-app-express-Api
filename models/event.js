var mongoose = require('mongoose');
var eventSchema = mongoose.Schema({
    event:{type:String},
    date:String
    // name : { type : String},
    // date : { type : Date },
    // time : { type : String },
    // location : { type : String },
    // contact : { type : String  },
    // email : { type : String  },
    // detail : {type:String}
});
module.exports = mongoose.model("Event",eventSchema);