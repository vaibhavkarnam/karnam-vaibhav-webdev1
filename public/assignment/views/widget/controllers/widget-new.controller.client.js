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
    function init() {
        model.widget = angular.copy(WidgetService.findWidgetById(model.widgetId));
    }
    init();
    function createWidgetHeader(widget) {
        var widget_id = WidgetService.createWidgetHeader(model.pageId, widget);
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
    }

    function createWidgetImage(widget) {
        var widget_id = WidgetService.createWidgetImage(model.pageId, widget);
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
    }

    function createWidgetYoutube(widget) {
        var widget_id =  WidgetService.createWidgetYoutube(model.pageId, widget);
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget_id);
    }
}
})();