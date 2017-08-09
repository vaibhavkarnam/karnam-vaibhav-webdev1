/**
* Created by vaibhav on 27-07-2017.
*/
var app = require('../../express');
var pageModel = require('../models/page/page.model.server');
app.get('/api/assignment/website/:websiteId/page', findPageByWebsiteId);
app.get('/api/assignment/page/:pageId', findPageById);
app.put('/api/assignment/page/:pageId', updatePage);
app.delete('/api/assignment/website/:websiteId/page/:pageId', deletePage);
app.post('/api/assignment/website/:websiteId/page', createPage);

function createPage(req, res) {
var page = req.body;
var websiteId = req.params.websiteId;
pageModel
.createPage(websiteId, page)
.then(function (page)
    {
        res.json(page);
    },
    function (error)
    {
        res.json(error);
    }
);
}

function findPageById(req, res) {
var pageId = req.params.pageId;
pageModel
.findPageById(pageId)
.then(function (page)
    {
        res.json(page);
    },
    function (error)
    {
        res.status(404).json(error);
    }
);
}

function findPageByWebsiteId(req, res) {
var websiteId = req.params.websiteId;
pageModel
.findAllPagesForWebsite(websiteId)
.then(function (pages)
    {
        res.json(pages);
    },
    function (error)
    {
        res.json(error);
    }
);
}

function updatePage(req, res) {
var page = req.body;
var pageId = req.params.pageId;
pageModel
.updatePage(pageId, page)
.then(function (status)
    {
        res.sendStatus(200);
    },
    function (error)
    {
        res.status(404).json(error);
    }
);
}


function deletePage(req, res) {
var pageId = req.params.pageId;
var websiteId = req.params.websiteId;
pageModel
.deletePage(pageId,websiteId)
.then(function (status)
    {
        res.sendStatus(200);
    },
    function (error)
    {
        res.status(404).json(error);
    }
);
}


