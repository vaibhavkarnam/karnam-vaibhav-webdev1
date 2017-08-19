/**
* Created by vaibhav on 13-08-2017.
*/
var mongoose = require("mongoose");


var movieProjectSchema = mongoose.Schema({
userID:{type:mongoose.Schema.Types.ObjectId, ref:"userModelNew"},
userName: String,
type: String,
title: String,
description: String,
movieId: String,
sort:{type:Number,default:0},
imdbMovieName: String,
userRole: String,
thumbsUp:[{type:mongoose.Schema.Types.ObjectId,ref:"userModelNew"}],
dislike:[{type:mongoose.Schema.Types.ObjectId,ref:"userModelNew"}],
date: { type: Date, default: Date.now }
},

    {collection: 'movies'});

module.exports = movieProjectSchema;