/**
 * Created by vaibhav on 02-08-2017.
 */

(function () {

    angular
        .module('omdbApp')
        .controller('searchController', searchController);

    function searchController($routeParams, movieService){
        var model = this;

        var imdbID = $routeParams.id;

        function init() {
            movieService
                .searchMovieById(imdbID)
                .then(renderMovie);
        }
        init();

        function renderMovie(movie) {
            model.movie = movie;
        }
    }
})();

