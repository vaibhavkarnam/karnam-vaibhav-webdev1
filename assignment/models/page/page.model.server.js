/**
* Created by vaibhav on 03-08-2017.
*/
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('pageModel', pageSchema);
var websiteModel = require('../website/website.model.server');
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
module.exports = pageModel;



function deleteWidget(pageId, widgetId) {
return pageModel
.findPageById(pageId)
.then(function (page) {
    var index = page.widgets.indexOf(widgetId);
    page.widgets.splice(index, 1);
    return page.save();
});
}


function findAllPagesForWebsite(websiteId) {
return pageModel
.find({_website: websiteId});
}

function findPageById(pageId) {
return pageModel
.findById(pageId);
}

function createPage(websiteId, page) {
page._website = websiteId;
return pageModel
.create(page)
.then(function (page) {
websiteModel
.addPage(websiteId, page._id);
return page;
});
}

function updatePage(pageId, page) {
return pageModel
.update({_id: pageId}, {$set: page});
}

function deletePage(pageId, websiteId) {
return pageModel
.remove({_id: pageId})
.then(function (page) {
return websiteModel
    .deletePage(websiteId, page._id);
});
}

function addWidget(pageId, widgetId) {
return pageModel
.findOne({_id: pageId})
.then(function (page)
{
page.widgets.push(widgetId);
return page.save();
})
}
