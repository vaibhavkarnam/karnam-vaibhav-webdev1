(function () {
angular
.module('WamApp')
.service('websiteService', websiteService);

function websiteService($http) {

this.findAllWebsitesForUser = findAllWebsitesForUser;
this.findWebsiteById = findWebsiteById;
this.createWebsite = createWebsite;
this.updateWebsite = updateWebsite;
this.deleteWebsite = deleteWebsite;

function findWebsiteById(websiteId) {
var url = "/api/assignment/website/"+websiteId;
return $http.get(url)
    .then(function (response) {
        return response.data;
    });
}

function findAllWebsitesForUser(userId) {
var url = "/api/assignment/user/"+userId+"/website";
return $http.get(url)
    .then(function (response) {
        return response.data;
    });
}

function createWebsite(website, userId) {
var url = "/api/assignment/user/"+userId+"/website";
return $http.post(url, website)
    .then(function (response) {
        return response.data;
    })
}

function updateWebsite(websiteId, website) {
var url = "/api/assignment/website/"+websiteId;
return $http.put(url, website)
.then(function (response) {
    return response.data;
})
}

function deleteWebsite(userId, websiteId) {
var url = "/api/assignment/user/"+userId+"/website/"+websiteId;
return $http.delete(url)
    .then(function (response) {
        return response.data;
    })
}
}
})();