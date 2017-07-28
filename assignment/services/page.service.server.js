/**
* Created by vaibhav on 27-07-2017.
*/
var app = require('../../express');
var pages = [
{ "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
{ "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
{ "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];
app.get('/api/assignment/website/:websiteId/page', findPageByWebsiteId);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/page/:pageId', deletePage);
app.post('/api/assignment/website/:websiteId/page', createPage);

function createPage(req, res) {
var page = req.body;
pages.push(page);
res.json(page);
}

function findPageById(req, res) {
var pageId = req.params['websiteId'];
for(var u in pages){
    if(pages[u]._id === req.params.pageId) {
        res.send(pages[u]);
        return;
    }
}
res.sendStatus(404)
    .send({message: 'Page was not found'});
}

function findPageByWebsiteId(req, res) {
var results = [];
for (var v in pages){
    if(pages[v].websiteId === req.params.websiteId) {

        results.push(pages[v]);
    }
}
res.json(results);
}

function deletePage(req, res) {
var page = req.body;
for(var u in pages) {
    if(pages[u]._id === req.params.pageId) {
        pages.splice(u, 1);
        res.sendStatus(200);
        return;
    }
}
res.sendStatus(404);
}

function updatePage(req, res) {
var page = req.body;
for(var u in pages) {
    if(pages[u]._id === req.params.pageId) {
        pages[u] = page;
        res.sendStatus(200);
        return;
    }
}
res.sendStatus(404);
}


