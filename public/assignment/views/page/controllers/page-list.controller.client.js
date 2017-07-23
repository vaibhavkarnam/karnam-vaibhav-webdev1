
(function () {

angular
    .module('WamApp')
    .controller('PageListController', PageListController);

function PageListController($routeParams, PageService){
    var model = this;
    model.userId = $routeParams['userId'];
    model.websiteId = $routeParams['websiteId'];
    function init() {
        model.pages = angular.copy(PageService.findPageByWebsiteId(model.websiteId));
    }
    init();
}
})();


