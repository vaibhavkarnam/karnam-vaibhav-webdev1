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
    templateUrl: 'views/templates/home.html',
    controller  : 'homeController',
    controllerAs: 'model',
    resolve:{
        currentUser:checkCurrentUser
    }
})
.when('/login',{
    templateUrl : 'views/templates/users/login.view.client.html',
    controller  : 'loginController',
    controllerAs: 'model'
})
.when('/register',{
    templateUrl : 'views/templates/users/register.view.client.html',
    controller  : 'registerController',
    controllerAs: 'model'
})
.when('/profile',{
    templateUrl : 'views/templates/users/profile.view.client.html',
    controller  : 'profileController',
    controllerAs: 'model',
    resolve: {
        currentUser: checkLoggedIn
    }
})
.when('/movie',{
    templateUrl : 'views/templates/cinema/movieDetails.view.client.html',
    controller  : 'profileController',
    controllerAs: 'model',
    resolve: {
        currentUser: checkLoggedIn
    }

})
.when('/profile/visitor/:visitorId',{
    templateUrl : 'views/templates/users/profile-visit.view.client.html',
    controller  : 'profileVisitController',
    controllerAs: 'model',
    resolve: {
        currentUser: checkLoggedIn
    }
})
.when('/movies/reviewUpdate/:reviewId',{
    templateUrl : 'views/templates/cinema/review-update.view.client.html',
    controller  : 'reviewController',
    controllerAs: 'model',
    resolve: {
        currentUser: checkLoggedIn
    }
})
.when('/user/movie/search/:movie',{
    templateUrl : 'views/templates/cinema/SearchMovies.view.client.html',
    controller  : 'searchMovieController',
    controllerAs: 'model',
    resolve: {
        currentUser: checkCurrentUser
    }
})
.when('/user/movies/:id',{
    templateUrl : 'views/templates/cinema/movieDetails.view.client.html',
    controller  : 'searchController',
    controllerAs: 'model',
    resolve: {
        currentUser: checkCurrentUser
    }
})
.when('/admin',{
    templateUrl : 'views/templates/admin/admin.view.client.html',
    controller  : 'adminController',
    controllerAs: 'model',
    resolve: {
        currentUser: checkLoggedIn
    }
});


function checkCurrentUser(userService, $location, $q)
{
var deferred = $q.defer();
userService
    .loggedin()
    .then(function (user)
    {
        if (user === '0')
        {
            deferred
                .resolve({});
        }
                else
        {
            deferred
                .resolve(user);
        }
    });
return deferred
    .promise;
}

function checkLoggedIn(userService, $q, $location)
{
var deferred = $q.defer();
userService
    .loggedin()
    .then(function (user)
    {
        if(user === '0')
        {
            deferred
                .reject();
            $location.url('/login');
        } else

        {
            deferred
                .resolve(user);
        }
    });
return deferred
    .promise;
}

}
})();