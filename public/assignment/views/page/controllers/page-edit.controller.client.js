
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
PageService
    .findPageByWebsiteId(model.websiteId)
    .then(function (pages) {
        model.pages = pages;
    });
PageService
    .findPageById(model.pageId)
    .then(function (page) {
        model.page = page;
    });
}
init();



function pageDelete(pageId) {
PageService
    .deletePage(pageId)
    .then(function () {
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
    });
}




function pageUpdate(pageId, page) {
PageService
    .updatePage(pageId, page)
    .then(function () {
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
    });
}
}
})();


