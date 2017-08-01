/**
* Created by vaibhav on 27-07-2017.
*/
var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});
var widgets = [
{ "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name":"", "index": 0},
{ "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name":"", "index": 1},
{ "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/",
"text":"", "name":"", "index": 2},
{ "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name":"", "index": 3},
{ "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name":"", "index": 4},
{ "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E",
"text":"", "name":"", "index": 5},
{ "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "text":"", "name":"", "index": 6}
];
app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.put('/api/page/:pageId/widget', WidgetOrdering);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);

app.post("/api/upload/", upload.single('myFile'), uploadImage);


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

function WidgetOrdering(req, res) {

if (req.query['initial'] && req.query['final']) {


var pageId = req.params['pageId'];

var results = findWidgets(pageId);
var initial = parseInt(req.query['initial']);
var final = parseInt(req.query['final']);
if (initial >= 0 && final < results.length)
{
var old, newPosition, Pos;
if (initial < final)
{
    Pos = -1;
    newPosition = final;
    old = initial;
}
else
    {
    Pos = 1;
    newPosition = initial;
    old = final;
}
for (var i=old; i <= newPosition; i++) {
    if (i === initial)
    {
        results[i].index = final;
    }
    else
        {
        results[i].index = results[i].index + Pos;
    }
}
res.sendStatus(200);
return;
}
}
res.sendStatus(400);
}


function findWidgets(pageId) {
var results = [];
for (var u in widgets)
{
if (widgets[u].pageId === pageId)

results.push(widgets[u]);

}
results.sort(function (indexOld, indexNew)
{
return indexOld.index > indexNew.index;
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

function uploadImage(req, res) {

var widgetId = req.body.widgetId;
var width = req.body.width;
var myFile = req.file;

var userId = req.body.userId;
var websiteId = req.body.websiteId;
var pageId = req.body.pageId;

var originalname = myFile.originalname; // file name on user's computer
var filename = myFile.filename;     // new file name in uploads folder
var path = myFile.path;         // full path of uploaded file
var destination = myFile.destination;  // folder where file is saved to
var size = myFile.size;
var mimetype = myFile.mimetype;

for (var u in widgets) {
if (widgets[u]._id === widgetId) {
var widget = widgets[u];
}
}
widget.url = '/assignment/uploads/' + filename;

var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

res.redirect(callbackUrl);
}