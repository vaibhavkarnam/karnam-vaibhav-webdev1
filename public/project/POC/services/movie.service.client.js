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
            var url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey=509f6a23";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

            function searchMovieByTitle(movieTitle) {
                var url = "http://www.omdbapi.com/?s="+movieTitle+"&apikey=509f6a23";
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
    }
})();

