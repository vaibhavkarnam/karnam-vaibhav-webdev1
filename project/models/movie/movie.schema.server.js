/**
 * Created by vaibhav on 13-08-2017.
 */
var mongoose = require("mongoose");
var movieProjectSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:"userModelNew"},
    movieID: String,
    user_name: String,
    type: String,
    title: String,
    description: String,
    moviename: String,
    userRole: String,
    date: { type: Date, default: Date.now },
    thumbsUp:[{type:mongoose.Schema.Types.ObjectId,ref:"userModelNew"}],
    dislike:[{type:mongoose.Schema.Types.ObjectId,ref:"userModelNew"}],
    sort:{type:Number,default:0}
}, {collection: 'movies'});

module.exports = movieProjectSchema;