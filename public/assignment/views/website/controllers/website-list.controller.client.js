(function () {

angular
    .module('WamApp')
    .controller('websiteListController', websiteListController);
function websiteListController($routeParams, websiteService){
    var model = this;
    model.userId = $routeParams['userId'];

    function init() {
        model.websites = angular.copy(websiteService.findAllWebsitesForUser(model.userId));
        model.newWebsites = angular.copy(model.websites);
    }
    init();
}
})();


