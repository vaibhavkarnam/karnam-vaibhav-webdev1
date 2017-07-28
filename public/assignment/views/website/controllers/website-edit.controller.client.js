(function () {

angular
.module('WamApp')
.controller('EditWebsiteController', EditWebsiteController);

function EditWebsiteController($routeParams, websiteService, $location){
var model = this;
model.userId = $routeParams['userId'];
model.websiteId = $routeParams['websiteId'];
model.websiteDelete = websiteDelete;
model.websiteUpdate = websiteUpdate;

function init() {
websiteService
    .findAllWebsitesForUser(model.userId)
    .then(function (websites) {
        model.websites = websites;});
websiteService
    .findWebsiteById(model.websiteId)
    .then(function (website) {
        model.website = website;});
}
init();

function websiteUpdate(websiteId, website) {
websiteService
    .updateWebsite(websiteId, website)
    .then(function () {
        $location.url('/user/'+model.userId+'/website/');
    });

}

function websiteDelete(websiteId) {
websiteService
    .deleteWebsite(websiteId)
    .then(function () {
        $location.url('/user/'+model.userId+'/website');
    });
}
}
})();


