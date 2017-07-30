/**
* Created by vaibhav on 29-07-2017.
*/
(function () {

angular
.module('WamApp')
.controller('FlickrSearchController', FlickrSearchController)

function FlickrSearchController($routeParams, $sce, flickrService, WidgetService, $location) {
var model = this;
model.searchPhotos = searchPhotos;
model.selectPhoto = selectPhoto;

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

function searchPhotos(searchTerm) {
flickrService
    .searchPhotos(searchTerm)
    .then(function(response) {
        data = response.data.replace("jsonFlickrApi(","");
        data = data.substring(0,data.length - 1);
        data = JSON.parse(data);
        model.photos = data.photos;
    });
}

function selectPhoto(photo) {
var url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server;
url +="/"+photo.id+"_"+photo.secret+"_b.jpg";
model.widget.url = url;
WidgetService
    .updateWidget(model.widgetId, model.widget)
    .then(function () {
        $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
    });
}
}
})();