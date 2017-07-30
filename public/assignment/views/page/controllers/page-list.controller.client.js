
(function () {

angular
.module('WamApp')
.controller('PageListController', PageListController);

function PageListController($routeParams, PageService){
var model = this;

model.websiteId = $routeParams['websiteId'];
model.userId = $routeParams['userId'];

function init() {
    PageService
        .findPageByWebsiteId(model.websiteId)
        .then(function (pages) {
            model.pages = pages;
        });
}
init();
}
})();
