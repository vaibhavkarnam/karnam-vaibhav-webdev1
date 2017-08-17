/**
* Created by vaibhav on 02-08-2017.
*/

(function () {

angular
.module('cineReview')
.controller('homeController', homeController);

function homeController($routeParams,$location, currentUser, movieService, userService){

var model = this;

model.userId = currentUser._id;
model.user = currentUser;
model.searchMovieByTitle = searchMovieByTitle;
model.logout = logout;
model.groupBy = groupBy;

model.CarouselDemoCtrl = CarouselDemoCtrl;

function init() {


}
init();

function searchMovieByTitle(movieTitle) {
movieService
.searchMovieByTitle(movieTitle)
.then(renderMovies);
}
function CarouselDemoCtrl($scope){
$scope.myInterval = 3000;
$scope.slides = [
{
    image: 'http://lorempixel.com/400/200/'
},
{
    image: 'http://lorempixel.com/400/200/food'
},
{
    image: 'http://lorempixel.com/400/200/sports'
},
{
    image: 'http://lorempixel.com/400/200/people'
}
];
}

function groupBy(year) {
var movieByYear = [];
console.log(model.movies);
}

function logout() {
userService
.logout()
.then(function (status) {
    $location.url('/login');
});
}


function renderMovies(movies) {
    model.movies = movies;
}

}
})();

