/**
* Created by vaibhav on 27-07-2017.
*/
var app = require('../../express');
var widgets = [
{ "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name":""},
{ "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name":""},
{ "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/",
    "text":"", "name":""},
{ "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name":""},
{ "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name":""},
{ "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E",
    "text":"", "name":""},
{ "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "text":"", "name":""}
];
app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.put('/api/page/:pageId/widget', WidgetReOrder);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);

function findWidgetsByPageId(req, res) {
var pageId = req.params['pageId'];
var results = findWidgets(pageId);
res.json(results);

}

function findWidgetById(req, res) {
var widgetId = req.params['widgetId']
for (var u in widgets) {
    if (widgets[u]._id === widgetId) {
        res.send(widgets[u]);
        return;
    }
}
res.sendStatus(404);
}

function findWidgetByIdServer(req, res) {
var widgetId = req.params['widgetId']
for (var u in widgets) {
    if (widgets[u]._id === widgetId) {
        res.send(widgets[u]);
        return;
    }
}
res.sendStatus(404);
}

function WidgetReOrder(req, res) {

if (req.query['initial'] && req.query['final']) {
    var pageId = req.params['pageId'];
    var initial = parseInt(req.query['initial']);
    var final = parseInt(req.query['final']);
    var results = findWidgets(pageId);
    if (initial >= 0 && final < results.length)
    {
        var oldindex, newindex, newPos;
        if (initial < final) {
            newindex = final;
            oldindex = initial;
            newPos = -1;
        } else {
            newPos = 1;
            newindex = initial;
            oldindex = final;
        }
        for (var i=oldindex; i <= newindex; i++)
        {
            if (i === initial)
                results[i].index = final;
            else
                results[i].index = results[i].index + newPos;
        }
        res.sendStatus(200);
        return;
    }
}
res.sendStatus(400);
}


function findWidgets(pageId) {
var results = [];
for (var u in widgets) {
    if (widgets[u].pageId === pageId) {
        results.push(widgets[u]);}
}
results.sort(function (index1, index2) {
    return index1.index > index2.index;
});
return results;
}

function createWidget(req, res) {
var pageId = req.params['pageId'];
var widget = req.body;
widget.index = findWidgets(pageId).length;
widgets.push(widget);
res.json(widget._id);

}


function deleteWidget(req, res) {
var widget = req.body;
for (var u in widgets) {
    if (widgets[u]._id === req.params.widgetId) {
        widgets.splice(u, 1);
        res.sendStatus(200);
        return;
    }
}
res.sendStatus(404);
}

function updateWidget(req, res) {
var widget = req.body;
for (var u in widgets) {
    if (widgets[u]._id === req.params.widgetId) {
        widgets[u] = widget;
        res.sendStatus(200);
        return;
    }
}
res.sendStatus(404);
}
