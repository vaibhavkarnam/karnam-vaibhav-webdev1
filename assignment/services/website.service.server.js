/**
* Created by vaibhav on 27-07-2017.
*/
var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.put('/api/assignment/website/:websiteId', updateWebsite);
app.delete('/api/assignment/user/:userId/website/:websiteId', deleteWebsite);

function findWebsiteById(req, res) {
var websiteId = req.params.websiteId;
websiteModel
    .findWebsiteById(websiteId)
    .then(function (website)
    {
        res.json(website);
    });
}

function findAllWebsitesForUser(req, res) {
websiteModel
    .findAllWebsitesForUser(req.params.userId)
    .then(function (websites)
    {
        res.json(websites);
    });
}

function createWebsite(req, res) {
var userId = req.params.userId;
var website = req.body;
websiteModel
    .createWebsiteForUser(userId, website)
    .then(function (website)
    {
        console.log(website);
        res.json(website);
    });
}

function updateWebsite(req, res) {
var website = req.body;
websiteModel
    .updateWebsite(req.params.websiteId, website)
    .then(function (status)
    {
        res.send(status);
    });
}

function deleteWebsite(req, res) {
var userId = req.params.userId;
var websiteId = req.params.websiteId;
websiteModel
    .deleteWebsiteFromUser(userId, websiteId)
    .then(function (response)
    {
        res.json(response);
    });

}


