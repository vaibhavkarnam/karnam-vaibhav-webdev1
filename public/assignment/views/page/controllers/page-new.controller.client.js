
(function () {

angular
    .module('WamApp')
    .controller('NewPageController', NewPageController);
function NewPageController($routeParams, PageService, $location){
    var model = this;

    model.createPage = createPage;

    model.userId = $routeParams['userId'];
    model.websiteId=$routeParams.websiteId;
    function init() {
        model.page = angular.copy(PageService.findPageById(model.pageId));
        model.pages = angular.copy(PageService.findPageByWebsiteId(model.websiteId));
    }
    init();

    function createPage(page) {
        PageService.createPage(model.websiteId, page);
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/');

    }
}

})();


