(function () {

angular
    .module('WamApp')
    .service('PageService', PageService);
function PageService() {

    var pages = [
        { "_id": "321", "name": "Page 1", "websiteId": "890", "description": "Lorem" },
        { "_id": "432", "name": "Page 2", "websiteId": "890", "description": "Lorem" },
        { "_id": "543", "name": "Page 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "546", "name": "Page 4", "websiteId": "567", "description": "Lorem" }
    ];

    this.findPageById = findPageById;
    this.findPageByWebsiteId = findPageByWebsiteId;
    this.deletePage = deletePage;
    this.createPage = createPage;
    this.updatePage = updatePage;

    function createPage(websiteId, page) {
        page._id = (new Date()).getTime()+"";
        page.websiteId = websiteId;
        pages.push(page);
    }

    function deletePage(pageId) {
        var page = findPageById(pageId);
        var index = pages.indexOf(page);
        pages.splice(index, 1);
    }

    function findPageById(pageId) {
        return pages.find(function (page) {
            return page._id === pageId;
        })
    }

    function findPageByWebsiteId(websiteId) {
        var results = [];
        for (var v in pages){
            if(pages[v].websiteId === websiteId) {
                results.push(pages[v]);
            }
        }
        return results;
    }

    function updatePage(pageId, page) {
        var page_old = findPageById(pageId);
        page_old.name = page.name;
        page_old.websiteId = page.websiteId;
        page_old.description = page.description;
    }
}
})();