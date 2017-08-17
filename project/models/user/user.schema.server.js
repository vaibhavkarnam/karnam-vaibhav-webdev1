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
facebook: {
id:    String,
token: String
},
phone : String,
ProfilePic: {type: String, default: "images/avatarimg.png"},
role : [{type: String, default: 'USER', enum: ['USER', 'CRITIC','ADMIN']}],
dateCreated: {type: Date, default: Date.now},
following: [{type:mongoose1.Schema.Types.ObjectId, ref:"userModelNew"}],
followers: [{type:mongoose1.Schema.Types.ObjectId, ref:"userModelNew"}],
UserReview: [{type:mongoose1.Schema.Types.ObjectId, ref:"reviewModel"}]
},
{collection: "project_user"});

module.exports = userSchemaNew;