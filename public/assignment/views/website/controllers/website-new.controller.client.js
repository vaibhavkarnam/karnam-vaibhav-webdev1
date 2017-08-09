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
    websiteService
        .createWebsite(website, model.userId)
        .then(function () {
            $location.url('/user/'+model.userId+'/website');
        });
}
}
})();


