/**
* Created by vaibhav on 13-08-2017.
*/
var mongoose = require("mongoose");


var movieProjectSchema = mongoose.Schema({
userID:{type:mongoose.Schema.Types.ObjectId, ref:"userModelNew"},
user_name: String,
type: String,
title: String,
description: String,
movieID: String,
sort:{type:Number,default:0},
moviename: String,
userRole: String,
thumbsUp:[{type:mongoose.Schema.Types.ObjectId,ref:"userModelNew"}],
dislike:[{type:mongoose.Schema.Types.ObjectId,ref:"userModelNew"}],
date: { type: Date, default: Date.now }
},

    {collection: 'movies'});

module.exports = movieProjectSchema;