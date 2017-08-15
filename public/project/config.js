/**
 * Created by vaibhav on 02-08-2017.
 */
(function () {

    angular
        .module("cineReview")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller  : 'movieController',
                controllerAs: 'model'
            })
            .when('/login',{
                templateUrl : 'views/user/templates/login.view.client.html',
                controller  : 'loginController',
                controllerAs: 'model'
            })
            .when('/register',{
                templateUrl : 'views/user/templates/register.view.client.html',
                controller  : 'registerController',
                controllerAs: 'model'
            })
            .when('/profile/:userId',{
                templateUrl : 'views/user/templates/profile.view.client.html',
                controller  : 'profileController',
                controllerAs: 'model'
            })
            .when('/movie',{
                templateUrl : 'views/user/templates/single.html',
                controller  : 'profileController',
                controllerAs: 'model'
            })
            .when('/profile/:userId/visitor/:visitorId',{
                templateUrl : 'views/user/templates/profile-visit.view.client.html',
                controller  : 'profileVisitController',
                controllerAs: 'model'
            })
            .when('/movies/reviewUpdate/:reviewId',{
                templateUrl : 'views/user/templates/review-update.view.client.html',
                controller  : 'reviewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/movie/search',{
                templateUrl : 'views/user/templates/review.html',
                controller  : 'movieController',
                controllerAs: 'model'
            })
            .when('/user/:userId/movies/:id',{
                templateUrl : 'views/user/templates/single.html',
                controller  : 'searchController',
                controllerAs: 'model'
            })

    }
})();