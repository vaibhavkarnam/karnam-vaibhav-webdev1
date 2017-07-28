(function () {

angular
.module('WamApp')
.service('PageService', PageService);

function PageService($http) {
this.findPageById = findPageById;
this.findPageByWebsiteId = findPageByWebsiteId;
this.deletePage = deletePage;
this.createPage = createPage;
this.updatePage = updatePage;

function findPageById(pageId) {
    var url = "/api/assignment/page/"+pageId;
    return $http.get(url)
        .then(function (response) {
            return response.data;
        });
}

function findPageByWebsiteId(websiteId) {
    var url = "/api/assignment/website/"+websiteId+"/page";
    return $http.get(url)
        .then(function (response) {
            return response.data;
        });
}

function createPage(websiteId, page) {
    page._id = (new Date()).getTime()+"";
    var url = "/api/assignment/website/"+websiteId+"/page";
    return $http.post(url, page)
        .then(function (response) {
            return response.data;
        })
}

function deletePage(pageId) {
    var url = "/api/assignment/page/"+pageId;
    return $http.delete(url)
        .then(function (response) {
            return response.data;
        })
}

function updatePage(pageId, page) {
    var url = "/api/assignment/page/"+pageId;
    return $http.put(url, page)
        .then(function (response) {
            return response.data;
        })
}
}
})();