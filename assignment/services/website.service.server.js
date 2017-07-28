/**
* Created by vaibhav on 27-07-2017.
*/
var app = require('../../express');
var websites = [
{ "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
{ "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
{ "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
{ "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
{ "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
{ "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
{ "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);

function findWebsiteById(req, res) {
var websiteId = req.params['websiteId']
for(var u in websites){
    if(websites[u]._id === websiteId) {
        res.send(websites[u]);
        return;
    }
}
res.sendStatus(404)
    .send({message: 'Website was not found'});
}

function findAllWebsitesForUser(req, res) {
var results = [];

for (var v in websites){
    if(websites[v].developerId === req.params.userId) {
        results.push(websites[v]);
    }
}
res.json(results);
}

function createWebsite(req, res) {
var website = req.body;
websites.push(website);
res.json(website);
}

function deleteWebsite(req, res) {
var website = req.body;
for(var u in websites) {
    if(websites[u]._id === req.params.websiteId) {
        websites.splice(u, 1);
        res.sendStatus(200);
        return;
    }
}
res.sendStatus(404);

}

function updateWebsite(req, res) {
var website = req.body;
for(var u in websites) {
    if(websites[u]._id === req.params.websiteId) {
        websites[u] = website;
        res.sendStatus(200);
        return;
    }
}
res.sendStatus(404);
}

