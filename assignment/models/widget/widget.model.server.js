/**
* Created by vaibhav on 03-08-2017.
*/
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('widgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidgetUrl = updateWidgetUrl;
widgetModel.widgetReorder = widgetReorder;
module.exports = widgetModel;

function findAllWidgetsForPage(pageId) {
return widgetModel
.find({_page: pageId})
.sort({order:1})
.exec();
}

function findWidgetById(widgetId) {
// console.log(widgetId);
return widgetModel
.findOne({_id: widgetId});
}

function createWidget(pageId, widget) {
widget._page = pageId;
//console.log(widget);
return widgetModel.create(widget)
    .then(function (widget) {
         pageModel
            .addWidget(pageId, widget._id);
         return widget;
    });
}

function updateWidget(widgetId, widget) {
return widgetModel
.update({_id: widgetId}, {$set: widget});
}

function updateWidgetUrl(widgetId, url) {
return widgetModel
.findOne({_id: widgetId })
.then(function (widget) {
widget.url = url;
return widget.save();
}
)
}

function widgetReorder(pageId,startIndex,endIndex){
return widgetModel.find({ _page: pageId })
.sort({order: 1})
.then(
function (widgets) {
for (var i=0;i<widgets.length;i++)
{
    var widget=widgets[i];

    if ((i>=startIndex && i<=endIndex)||(i>=endIndex && i<=startIndex))
    {
        if (i==startIndex)

            widget.order=endIndex;

        else if (startIndex>endIndex)
        {
            widget.order=i+1;
        }
        else
            {
            widget.order=i-1;
        }
    }
    else
        {
        widget.order=i;
    }
    widget.save();
}
});
}


function deleteWidget(pageId, widgetId) {
return widgetModel
.remove({_id: widgetId})
    .then(function (widget) {
        return pageModel
            .deleteWidget(pageId, widget._id);
    });
}