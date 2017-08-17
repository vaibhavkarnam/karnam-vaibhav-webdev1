/**
* Created by vaibhav on 02-08-2017.
*/
(function () {

angular
.module('cineReview')
.controller('searchMovieController', searchMovieController);

function searchMovieController($routeParams, currentUser,  movieService, userService){

var model = this;

model.userId = currentUser._id;
model.movieListByTitle = movieListByTitle;
model.logout = logout;
model.movie = $routeParams.movie;

function init() {

    movieListByTitle(model.movie)
}
init();

function movieListByTitle(movieTitle) {
    // console.log("movies");
    movieService
        .movieListByTitle(movieTitle)
        .then(renderMovies);
}

function renderMovies(movies) {
    model.searchedMovies = movies;
}

function logout() {
    userService
        .logout()
        .then(function () {
            $location.url('/login');
        });
}

}
})();

