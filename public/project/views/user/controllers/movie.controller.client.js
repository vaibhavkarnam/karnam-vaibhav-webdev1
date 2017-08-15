/**
 * Created by vaibhav on 02-08-2017.
 */

(function () {

    angular
        .module('cineReview')
        .controller('movieController', movieController);

    function movieController($routeParams, movieService){

        var model = this;

        model.userId = $routeParams.userId;
        model.searchMovieByTitle = searchMovieByTitle;

        function init() {

        }
        init();

        function searchMovieByTitle(movieTitle) {
            console.log("movies");
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }

    }
})();

