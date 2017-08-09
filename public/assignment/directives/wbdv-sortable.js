(function () {

angular
.module('WamApp')
.directive('wbdvsortable', wbdvsortable);
function wbdvsortable () {
function linkFunction(scope, element) {
$(element).sortable({

    start: function(e, ele) {
        this.startIndex = ele.item.index();
    },

    stop: function(e, ele) {
        scope.callback({Inital: this.startIndex, Final: ele.item.index()});

    }
});

}
return {
scope: { callback: '&' },
link: linkFunction

};
}
})();
