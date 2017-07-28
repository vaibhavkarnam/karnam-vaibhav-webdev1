/**
* Created by vaibhav on 27-07-2017.
*/
(function () {

angular
.module('WamApp')
.directive('wbdvsortable', wbdvsortable);

function wbdvsortable () {

function linkFunction(scope, element) {
    $(element).sortable({
        start: function(event, ui)
        {

            this.Index = ui.item.index();

            },
        stop: function(event, ui)
        {

            scope.callback({InitalPosition: this.Index, FinalPosition: ui.item.index()});

        }});
}
return {

    scope:{callback:'&'},
    link: linkFunction

};
}
})();
