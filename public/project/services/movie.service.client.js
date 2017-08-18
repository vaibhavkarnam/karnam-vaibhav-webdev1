/**
* Created by vaibhav on 02-08-2017.
*/
(function () {
angular
.module('cineReview')
.factory('movieService', movieService);

function movieService($http) {
var api ={

movieListByTitle : movieListByTitle,
searchMovieById : searchMovieById,
createReview : createReview,
findReviewById : findReviewById,
updateUserReview : updateUserReview,
deleteReview : deleteReview,
thumbsUp : thumbsUp,
findAllReviews : findAllReviews,
deleteReviewsforUser : deleteReviewsforUser,
getAllUserReviews : getAllUserReviews,
getReviewById : getReviewById,
getUserReviews : getUserReviews,
dislike : dislike

};

return api;

function searchMovieById(imdb)
{
var url = "/api/project/movie/id/"+imdb;
return $http
.get(url)
.then(function (response)
{
     console.log(response);
    return response.data;
});
}

function findReviewById(reviewId)
{
return $http
.get("/api/project/userReview/" + reviewId);
}

function findAllReviews(userId)
{
return $http
.get("/api/project/user/"+userId+"/review");
}


function getUserReviews(newmovieId)
{
var url="/api/project/getMovieReview/"+newmovieId;
return $http
.get(url)
.then(function (response)
{
    return response.data;
});
}

function thumbsUp(reviewId,userId)
{
var url="/api/"+userId+"/thumbsUp/"+reviewId;
return $http
.put(url)
.then(function (response)
{
    return response.data;
});
}

function deleteReviewsforUser(userId)
{
return $http
.post("/api/project/user/del/"+userId+"/review");
}


function dislike(reviewId,userId)
{
var url="/api/"+userId+"/dislike/"+reviewId;
return $http
.put(url)
.then(function (response)
{
    return response.data;
});
}

function movieListByTitle(movieName)
{
var url = "/api/search/movieName/"+movieName;
return $http
    .get(url)
    .then(function (response)
    {
        // console.log(response);
        return response.data;
    });
}

function deleteReview(Id)
{
var url ="/api/project/userReview/"+Id;
return $http
.delete(url)
.then(function (response)
{
    return response;
});
}

function updateUserReview(reviewId,review)
{
var url="/api/project/userReview/"+reviewId;
return $http
.put(url,review)
.then(function (response)
{
    return response.data;
});
}

function getReviewById(reviewId)
{
var url="/api/project/userReview/"+reviewId;
return $http.get(url)
.then(function (response)
{
    return response.data;
});
}

function createReview(review, userId)
{
return $http
.post("/api/project/user/"+userId+"/review", review);
}


function getAllUserReviews(userId)
{
var url="/api/project/getReviewForUser/"+userId;
return $http.get(url)
.then(function (response)
{
    return response.data;
});
}
}
})();

