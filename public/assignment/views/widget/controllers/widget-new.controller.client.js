(function () {

angular
.module('WamApp')
.controller('WidgetNewController', WidgetNewController);
function WidgetNewController($routeParams, $sce, WidgetService, $location) {
var model = this;

model.createWidgetHeader = createWidgetHeader;
model.createWidgetImage = createWidgetImage;
model.createWidgetYoutube = createWidgetYoutube;

model.userId = $routeParams['userId'];
model.websiteId = $routeParams.websiteId;
model.pageId = $routeParams.pageId;
model.widgetId = $routeParams.wgid;

function createWidgetImage(widget) {
WidgetService
    .createWidgetImage(model.pageId, widget)
    .then(function (widgetId) {
        var widget_id = widgetId;
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
    });
}

function createWidgetHeader(widget) {
WidgetService
    .createWidgetHeader(model.pageId, widget)
    .then(function (widgetId) {
        var widget_id = widgetId;
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
    });
}

function createWidgetYoutube(widget) {
WidgetService
    .createWidgetYoutube(model.pageId, widget)
    .then(function (widgetId) {
        var widget_id = widgetId;
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
    });
}
}
})();