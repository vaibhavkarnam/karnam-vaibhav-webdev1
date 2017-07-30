(function () {

angular
    .module("WamApp")
    .config(configuration);

function configuration($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        })
        .when("/login", {
            templateUrl: "views/user/templates/login.view.client.html",
            controller: "loginController",
            controllerAs: "model"
        })
        .when('/', {
            templateUrl: 'views/user/templates/login.view.client.html',
            controller: 'loginController',
            controllerAs: 'model'
        })
        .when('/default', {
            templateUrl: 'views/user/templates/login.view.client.html',
            controller: 'loginController',
            controllerAs: 'model'
        })
        .when("/register", {
            templateUrl: "views/user/templates/register.view.client.html",
            controller: "registerController",
            controllerAs: "model"
        })
        .when("/profile/:userId", {
            templateUrl: "views/user/templates/profile.view.client.html",
            controller: "profileController",
            controllerAs: "model"
        })
        // website routes
        .when("/user/:userId/website", {
            templateUrl: "views/website/templates/website-list.view.client.html",
            controller: "websiteListController",
            controllerAs: "model"
        })
        .when('/user/:userId/website/new', {
            templateUrl: 'views/website/templates/website-new.view.client.html',
            controller: 'NewWebsiteController',
            controllerAs: 'model'
        })
        .when('/user/:userId/website/:websiteId', {
            templateUrl: 'views/website/templates/website-edit.view.client.html',
            controller: 'EditWebsiteController',
            controllerAs: 'model'
        })
        .when('/user/:userId/website/:websiteId/page', {
            templateUrl: 'views/page/templates/page-list.view.client.html',
            controller: 'PageListController',
            controllerAs: 'model'
        })
        .when('/user/:userId/website/:websiteId/page/new', {
            templateUrl: 'views/page/templates/page-new.view.client.html',
            controller: 'NewPageController',
            controllerAs: 'model'
        })
        .when('/user/:userId/website/:websiteId/page/:pageId', {
            templateUrl: 'views/page/templates/page-edit.view.client.html',
            controller: 'EditPageController',
            controllerAs: 'model'
        })
        .when('/user/:userId/website/:websiteId/page/:pageId/widget', {
            templateUrl: 'views/widget/templates/widget-list.view.client.html',
            controller: 'WidgetListController',
            controllerAs: 'model'
        })
        .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
            templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
            controller: 'WidgetNewController',
            controllerAs: 'model'
        })
        .when('/user/:userId/website/:websiteId/page/:pageId/widget/:wgid', {
            templateUrl: 'views/widget/templates/widget-edit.view.client.html',
            controller: 'WidgetEditController',
            controllerAs: 'model'
        })
        .when('/user/:userId/website/:websiteId/page/:pageId/widget/:wgid/flickr', {
            templateUrl: 'views/widget/templates/flickr.view.client.html',
            controller: 'FlickrSearchController',
            controllerAs: 'model'
        })
}
})();