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
        model.widget = angular.copy(WidgetService.findWidgetById(model.widgetId));
    }
    init();
    function widgetUpdate(widget) {
        WidgetService.updateWidget(model.widgetId, widget);
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
    }

    function widgetDelete(widgetId) {
        WidgetService.deleteWidget(widgetId);
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
    }
}
})();
