/**
* Created by vaibhav on 02-08-2017.
*/
var mongoose1 = require('mongoose');

var userSchemaNew = mongoose1.Schema({
username : {type: String, unique: true},
password : String,
firstName : String,
lastName : String,
phone : String,
google:{
id : String,
token : String
},
UserReview : [{type:mongoose1.Schema.Types.ObjectId, ref:"movieProjectSchema"}],
email : String,
role : [{type: String, default: 'USER', enum: ['USER', 'CRITIC','ADMIN']}],
ProfilePic : {type: String, default: "images/avatarimg.png"},
followers : [{type:mongoose1.Schema.Types.ObjectId, ref:"userModelNew"}],
following : [{type:mongoose1.Schema.Types.ObjectId, ref:"userModelNew"}],
dateCreated : {type: Date, default: Date.now}
},
    {collection: "project_user"});

module.exports = userSchemaNew;