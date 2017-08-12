/**
 * Created by vaibhav on 02-08-2017.
 */
(function () {
    angular
        .module('omdbApp')
        .factory('movieService', movieService);

    function movieService($https) {
        var api ={
            searchMovieByTitle : searchMovieByTitle,
            searchMovieById : searchMovieById
        };

        return api;

        function searchMovieById(imdbID) {
            var url = "https://www.omdbapi.com/?i=" + imdbID + "&apikey=509f6a23";
            return $https.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

            function searchMovieByTitle(movieTitle) {
                var url = "https://www.omdbapi.com/?s="+movieTitle+"&apikey=509f6a23";
                return $https.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
    }
})();

