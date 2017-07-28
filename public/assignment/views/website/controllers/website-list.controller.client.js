(function () {

angular
.module('WamApp')
.controller('websiteListController', websiteListController);
function websiteListController($routeParams, websiteService){
var model = this;
model.userId = $routeParams['userId'];
model.findAllWebsitesForUser = findAllWebsitesForUser;
function init() {
    websiteService
        .findAllWebsitesForUser(model.userId)
        .then(function (websites) {
            model.websites = websites;
        });
}
init();
}
})();


