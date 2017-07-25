(function () {

angular
    .module('WamApp')
    .service('WidgetService', WidgetService);
function WidgetService() {

    var widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "GIZMODO"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/",
            "name": "GIZMODO", "text": "GIZMODO"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Welcome to Gizmodo</p>", "name": "GIZMODO"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%","url": "https://youtu.be/8v4o6cRRsr0",
            "name": "GIZMODO", "text": "GIZMODO"},
        { "_id": "789", "widgetType": "HTML", "pageId": "234", "text": "<p>Robot explores the sea</p>", "name": "GIZMODO"}
    ];


    this.findWidgetsByPageId = findWidgetsByPageId;
    this.deleteWidget = deleteWidget;
    this.updateWidget = updateWidget;
    this.findWidgetById = findWidgetById;
    this.createWidgetHeader = createWidgetHeader;
    this.createWidgetImage = createWidgetImage;
    this.createWidgetYoutube = createWidgetYoutube;

    function createWidgetImage(pageId, widget) {
        widget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "", "url": "", "text": "", "name": "" };
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        return widget._id
    }

    function createWidgetHeader(pageId, widget) {
        widget = { "_id": "", "widgetType": "HEADING", "pageId": "", "size": "", "text": "", "name": ""};
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        return widget._id
    }

    function createWidgetYoutube(pageId, widget) {
        widget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "", "url": "", "text": "", "name": ""};
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        return widget._id
    }


    function deleteWidget(widgetId) {
        var widget = findWidgetById(widgetId);
        var index = widgets.indexOf(widget);
        widgets.splice(index, 1);
    }

    function findWidgetById(widgetId) {
        return widgets.find(function (widget) {
            return widget._id === widgetId;
        });
    }

    function findWidgetsByPageId(pageId) {
        var results = [];
        for (var v in widgets){
            if(widgets[v].pageId === pageId) {
                results.push(widgets[v]);
            }
        }
        return results;
    }

    function updateWidget(widgetId, widget) {
    var widget_old = findWidgetById(widgetId);
    var widget_switch = widget_old.widgetType;
    switch (widget_switch) {
        case 'HEADING':
            widget_old.pageId = widget.pageId;
            widget_old.size = widget.size;
            widget_old.text = widget.text;
            break;

        case 'HTML':
            widget_old.pageId = widget.pageId;
            widget_old.text = widget.text;
            break;

        case 'IMAGE':
            widget_old.pageId = widget.pageId;
            widget_old.width = widget.width;
            widget_old.url = widget.url;
            break;

        case 'YOUTUBE':
            widget_old.pageId = widget.pageId;
            widget_old.width = widget.width;
            widget_old.url = widget.url;

            break;
    }
    }
}
})();