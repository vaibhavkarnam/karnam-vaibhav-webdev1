/**
* Created by vaibhav on 02-08-2017.
*/
var mongoose1 = require('mongoose');
var userSchemaNew = mongoose1.Schema({
username: {type: String, unique: true},
password: String,
firstName: String,
lastName: String,
email: String,
phone : String,
role : [{type: String, default: 'USER', enum: ['USER', 'CRITIC','ADMIN']}],
dateCreated: {type: Date, default: Date.now},
following: [{type:mongoose1.Schema.Types.ObjectId, ref:"userModelNew"}],
followers: [{type:mongoose1.Schema.Types.ObjectId, ref:"userModelNew"}]
},
{collection: "project_user"});

module.exports = userSchemaNew;