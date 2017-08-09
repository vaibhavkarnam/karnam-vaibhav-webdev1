(function () {

angular
.module('WamApp')
.service('WidgetService', WidgetService);

function WidgetService($http) {

this.updateWidget = updateWidget;
this.findWidgetById = findWidgetById;
this.createWidgetHeader = createWidgetHeader;
this.createWidgetImage = createWidgetImage;
this.createWidgetYoutube = createWidgetYoutube;
this.WidgetSortable = WidgetSortable;
this.findWidgetsByPageId = findWidgetsByPageId;
this.deleteWidget = deleteWidget;
this.createWidgetHTML = createWidgetHTML;
this.createWidgetText = createWidgetText;


function findWidgetById(widgetId) {
    console.log(widgetId);
var url = "/api/assignment/widget/"+widgetId;
return $http.get(url)
.then(function (response){
    console.log(response);
return response.data;
})
}

function findWidgetsByPageId(pageId) {
var url = "/api/assignment/page/"+pageId+"/widget";
return $http.get(url)
.then(function (response) {
return response.data;
})
}

function createWidgetHeader(pageId, widget) {
widget = { type: "HEADING"};
var url = "/api/assignment/page/"+pageId+"/widget";
return $http.post(url, widget)
.then(function (response) {
return response.data;
})
}

function createWidgetImage(pageId, widget) {
widget = { type: "IMAGE", "width": "100%"};
var url = "/api/assignment/page/"+pageId+"/widget";
return $http.post(url, widget)
.then(function (response) {
return response.data;
})
}

function createWidgetYoutube(pageId, widget) {
widget = {type: "YOUTUBE", "width": "100%"};
var url = "/api/assignment/page/"+pageId+"/widget";
return $http.post(url, widget)
.then(function (response) {
return response.data;
})
}

function createWidgetText(pageId, widget) {
widget = {type: "TEXT"};
var url = "/api/assignment/page/"+pageId+"/widget";
return $http.post(url, widget)
    .then(function (response) {
        return response.data;
    })
}

function createWidgetHTML(pageId, widget) {
widget = {type: "HTML"};
var url = "/api/assignment/page/"+pageId+"/widget";
return $http.post(url, widget)
    .then(function (response) {
        return response.data;
    })
}

function deleteWidget(pageId, widgetId) {
var url = "/api/assignment/page/"+pageId+"/widget/"+widgetId;
return $http.delete(url)
.then(function (response) {
return response.data;
})
}

function updateWidget(widgetId, widget) {
var url = "/api/assignment/widget/"+widgetId;
return $http.put(url, widget)
.then(function (response) {
return response.data;
})
}

function WidgetSortable(pageId, index1, index2) {
var url = '/api/page/'+ pageId +'/widget?start='+ index1 +"&end="+ index2;
return $http.put(url);
}
}
})();