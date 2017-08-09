/**
* Created by vaibhav on 03-08-2017.
*/
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('websiteModel',websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.findAllWebsites = findAllWebsites;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;
module.exports = websiteModel;



function addPage(websiteId, pageId) {
return websiteModel
.findWebsiteById(websiteId)
.then(function (website) {
    website.pages.push(pageId);
    return website.save();
});
}

function deletePage(websiteId, pageId) {
return websiteModel
.findWebsiteById(websiteId)
.then(function (website) {
    var index = website.pages.indexOf(pageId);
    website.pages.splice(index, 1);
    return website.save();
});
}


function findAllWebsites() {
return websiteModel.find();
}

function findWebsiteById(websiteId) {
return websiteModel.findById(websiteId);
}

function findAllWebsitesForUser(userId) {
return websiteModel
.find({_user: userId})
.populate('_user')
.exec();
}

function createWebsiteForUser(userId, website) {
website._user = userId;
console.log("printing");
console.log(userId);
return websiteModel.create(website)
.then(function (website) {
    userModel
        .addWebsite(userId, website._id)
    return website;
});
}

function updateWebsite(websiteId, newWebsite) {
return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}

function deleteWebsiteFromUser(userId, websiteId) {
return websiteModel
    .remove({_id: websiteId})
.then(function () {
    return userModel
        .deleteWebsite(userId, websiteId);
    return;
});
}



