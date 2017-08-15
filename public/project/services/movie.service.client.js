/**
 * Created by vaibhav on 02-08-2017.
 */
(function () {
    angular
        .module('cineReview')
        .factory('movieService', movieService);

    function movieService($http) {
        var api ={
            searchMovieByTitle : searchMovieByTitle,
            searchMovieById : searchMovieById,
            createReview : createReview,
            findReviewById : findReviewById,
            reviewUpdate : reviewUpdate,
            deleteReview : deleteReview,
            findAllReviews : findAllReviews,
            findUserReviewsforMovie : findUserReviewsforMovie,
            findCriticReviewsforMovie : findCriticReviewsforMovie,
            deleteReviewsforUser : deleteReviewsforUser,
            getReviewsForUser : getReviewsForUser,
            getReviewById : getReviewById,
            getUserReviews : getUserReviews
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

        function getUserReviews(movieId) {
            var url="/api/getReviewByMovieId/"+movieId;
            return $http.get(url)
                .then(function (response) {
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

        function deleteReview(reviewId) {
            var url ="/api/review/"+reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function reviewUpdate(reviewId,review) {
            var url="/api/review/"+reviewId;
            return $http.put(url,review)
                .then(function (response) {
                    return response.data;
                });
        }

        function getReviewById(reviewId) {
            var url="/api/review/"+reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createReview(review, userId) {
             console.log("Review:"+review);
             console.log("UserId:"+userId);

            return $http.post("/api/user/"+userId+"/review", review);
        }

        function deleteReviewsforUser(userID) {
            return $http.post("/api/user/del/" + userID + "/review");
        }

        function findReviewById(reviewId) {
            return $http.get("/api/review/" + reviewId);
        }

        function updateReview(reviewId, review) {
            return $http.put("/api/review/" + reviewId, review);
        }

        function findAllReviews(userID) {
            return $http.get("/api/user/" + userID + "/review");
        }

        function findUserReviewsforMovie(movieId) {
            return $http.get("/api/rest/" + movieId + "/review");
        }

        function findCriticReviewsforMovie(movieId) {
            return $http.get("/api/rest/" + movieId + "/critic/review");
        }

        function getReviewsForUser(userId) {
            var url="/api/getReviewByUserId/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();

