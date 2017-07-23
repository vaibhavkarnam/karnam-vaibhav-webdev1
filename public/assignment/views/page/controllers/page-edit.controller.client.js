
(function () {

angular
    .module('WamApp')
    .controller('EditPageController', EditPageController);
function EditPageController($routeParams, PageService, $location){
    var model = this;


    model.pageDelete = pageDelete;
    model.pageUpdate = pageUpdate;

    model.userId = $routeParams['userId'];
    model.pageId = $routeParams.pageId;
    model.websiteId = $routeParams.websiteId;
    function init() {
        model.page = angular.copy(PageService.findPageById(model.pageId));
    }
    init();

    function pageUpdate(pageId, page) {
        PageService.updatePage(pageId, page);
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
    }

    function pageDelete(pageId) {
        PageService.deletePage(pageId);
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
    }
}
})();


