/**
* Created by vaibhav on 02-08-2017.
*/
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
username: {type: String, unique: true},
password: String,
firstName: String,
lastName: String,
email: String,
phone : String,
websites: [{type: mongoose.Schema.Types.ObjectId, ref: "websiteModel"}],
dateCreated: {type: Date, default: Date.now}
},
    {collection: "user_summer2"});

module.exports = userSchema;