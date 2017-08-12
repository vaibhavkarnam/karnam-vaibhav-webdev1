/**
 * Created by vaibhav on 02-08-2017.
 */
(function () {
    angular
        .module('omdbApp')
        .factory('movieService', movieService);

    function movieService($http) {
        var api ={
            searchMovieByTitle : searchMovieByTitle,
            searchMovieById : searchMovieById
        };

        return api;

        function searchMovieById(imdbID) {
            var url = "/api/id/"+imdbID;
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

            function searchMovieByTitle(movieTitle) {
                var url = "/api/search/"+movieTitle;
                return $http.get(url)
                    .then(function (response) {
                        console.log(response);
                        return response.data;
                    });
            }
    }
})();

