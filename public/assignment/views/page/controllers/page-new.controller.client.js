
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
PageService
    .findPageByWebsiteId(model.websiteId)
    .then(function (pages) {
        model.pages = pages;
    });
}
init();
function createPage(page) {
page.websiteId = model.websiteId;
page._id = (new Date()).getTime()+"";
PageService
    .createPage(model.websiteId, page)
    .then(function () {
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
    });
}
}

})();


