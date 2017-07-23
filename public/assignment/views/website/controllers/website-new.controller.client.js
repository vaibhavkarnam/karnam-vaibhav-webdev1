(function () {

angular
    .module('WamApp')
    .controller('NewWebsiteController', NewWebsiteController);
function NewWebsiteController($routeParams, websiteService, $location){
    var model = this;
    model.userId = $routeParams['userId'];
    model.createWebsite = createWebsite;
    function init() {
        model.websites = angular.copy(websiteService.findAllWebsitesForUser(model.userId));
        model.newWebsites = angular.copy(model.websites);
    }
    init();
    function createWebsite(website) {
        website.developerId = model.userId;
        websiteService.createWebsite(website);
        $location.url('/user/'+model.userId+'/website');

    }
}
})();


