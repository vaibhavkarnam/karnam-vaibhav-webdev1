(function () {

angular
.module('WamApp')
.controller('WidgetEditController', WidgetEditController);
function WidgetEditController($routeParams, $sce, WidgetService, $location) {
var model = this;

model.widgetUpdate = widgetUpdate;
model.widgetDelete = widgetDelete;

model.userId = $routeParams['userId'];
model.websiteId = $routeParams.websiteId;
model.pageId = $routeParams.pageId;
model.widgetId = $routeParams.wgid;
function init() {
WidgetService
    .findWidgetById(model.widgetId)
    .then(function (widget) {
        model.widget = widget;
    });
}
init();
function widgetDelete(widgetId) {
WidgetService
    .deleteWidget(widgetId)
    .then(function () {
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
    });
}
function widgetUpdate(widget) {
WidgetService
    .updateWidget(model.widgetId, widget)
    .then(function () {
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
    });
}
}
})();
