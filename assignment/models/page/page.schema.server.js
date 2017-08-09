/**
* Created by vaibhav on 03-08-2017.
*/
var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
_website: { type: mongoose.Schema.Types.ObjectId, ref: 'websiteModel' },
name: String,
title: String,
description: String,
createdOn: { type: Date, default: Date.now() },
widgets: [ {type: mongoose.Schema.Types.ObjectId, ref: 'widgetModel' } ],
},
    { collection: 'page_summer2'});
module.exports = pageSchema;
