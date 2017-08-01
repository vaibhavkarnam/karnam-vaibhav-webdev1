/**
* Created by vaibhav on 29-07-2017.
*/
(function () {

angular
.module('WamApp')
.service('flickrService', flickrService);
function flickrService($http) {

var key = "e690dceb740199ce5a48d859ecb46acd";
var secret = "e8ade2a8ca4d72cc";
var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
this.searchPhotos = searchPhotos;

function searchPhotos(searchTerm) {
var url = urlBase
    .replace("API_KEY", key)
    .replace("TEXT", searchTerm);
return $http.get(url);

}
}
})();
