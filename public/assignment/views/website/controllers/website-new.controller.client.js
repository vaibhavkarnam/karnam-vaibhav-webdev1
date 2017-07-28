(function () {

angular
.module('WamApp')
.controller('NewWebsiteController', NewWebsiteController);
function NewWebsiteController($routeParams, websiteService, $location){
var model = this;
model.userId = $routeParams['userId'];
model.createWebsite = createWebsite;
function init() {
    websiteService
        .findAllWebsitesForUser(model.userId)
        .then(function (websites) {
            model.websites = websites;
        });
}
init();
function createWebsite(website) {
    website.developerId = model.userId;
    website._id = (new Date()).getTime()+"";
    websiteService
        .createWebsite(website)
        .then(function () {
            $location.url('/user/'+model.userId+'/website');
        });
}
}
})();


