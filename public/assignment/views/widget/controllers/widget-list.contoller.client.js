/**
* Created by vaibhav on 23-07-2017.
*/
(function () {

angular
.module('WamApp')
.controller('WidgetListController', WidgetListController);
function WidgetListController($routeParams, $sce, WidgetService) {
var model = this;

model.trust = trust;
model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
model.widgetsSort = widgetsSort;

model.userId = $routeParams['userId'];
model.websiteId = $routeParams.websiteId;
model.pageId = $routeParams.pageId;
function init() {
    WidgetService
        .findWidgetsByPageId(model.pageId)
        .then(function (widgets) {
            model.widgets = widgets;
        });
}
init();
function getYouTubeEmbedUrl(linkUrl) {
    var embedUrl = "https://www.youtube.com/embed/";
    var linkUrlParts = linkUrl.split('/');
    embedUrl += linkUrlParts[linkUrlParts.length - 1];
    return $sce.trustAsResourceUrl(embedUrl);
}
function trust(html) {
    return $sce.trustAsHtml(html);
}
function widgetsSort (initalPos, finalPos) {
    WidgetService
        .WidgetsOrder(model.pageId, initalPos, finalPos);
}
}
})();