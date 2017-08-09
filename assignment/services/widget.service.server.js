/**
* Created by vaibhav on 27-07-2017.
*/
var app = require('../../express');

var widgetModel = require('../models/widget/widget.model.server');


var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});
app.get('/api/assignment/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.put('/api/page/:pageId/widget', WidgetOrdering);
app.delete('/api/assignment/page/:pageId/widget/:widgetId', deleteWidget);
app.post("/api/upload/", upload.single('myFile'), uploadImage);


function findWidgetsByPageId(req, res) {
var pageId = req.params.pageId;
widgetModel.findAllWidgetsForPage(pageId)
.then(function (widgets)
{
res.json(widgets);
});

}

function findWidgetById(req, res) {
var widgetId=req.params.widgetId;
//console.log(widgetId);
widgetModel.findWidgetById(widgetId)
.then(function (widget)
{
    console.log("widget");
    console.log(widget);
res.json(widget);
});
}

function WidgetOrdering(req, res) {
var OldIndex = parseInt(req.query.start);
var NewIndex = parseInt(req.query.end);
var pageId = req.params.pageId;
console.log("ordering");
widgetModel.widgetReorder(pageId, OldIndex, NewIndex)
.then(function ()
{
    res.sendStatus(200);
});
}

function createWidget(req, res) {
var pageId=req.params.pageId;
var widget=req.body;
console.log(widget);
widgetModel.findAllWidgetsForPage(pageId)
.then(function (results)
{
widget.order =results.length;
widgetModel.createWidget(pageId, widget)
.then(
    function (widget)
    {
        console.log("created");
        res.json(widget._id);
    }
)
});
}

function deleteWidget(req, res) {
var widgetId=req.params.widgetId;
var pageId =req.params.pageId;
widgetModel.deleteWidget(pageId, widgetId)
.then(function(status)
{
res.sendStatus(200);
}
);
}

function updateWidget(req, res) {
var newWidget = req.body;
var widgetId = req.params.widgetId;
widgetModel.updateWidget(widgetId,newWidget)
.then(function (status)
{
res.sendStatus(200);
});
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

widget=widgetModel.findWidgetById(widgetId);
widget.url = '/assignment/uploads/'+filename;
widgetModel.updateWidget(widgetId,widget)
    .then(function(){
        var callbackUrl= "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
        res.redirect(callbackUrl);
    });
}