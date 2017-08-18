/**
* Created by vaibhav on 02-08-2017.
*/
var app=require('../../express');

var http =require('http');
var movieProjectModel = require("../models/movie/movie.model.server");

app.get("/api/search/movieName/:movie",movieListByTitle);
app.put("/api/project/userReview/:reviewId", updateReview);
app.get("/api/project/movie/id/:id",searchMovieByImdbId);
app.post("/api/project/user/:userId/review", createReview);
app.post("/api/project/user/del/:userId/review", deleteReviewsforUser);
app.get("/api/project/user/:userId/review", findAllReviews);
app.delete("/api/project/userReview/:reviewId", deleteReview);
app.get("/api/project/getReviewForUser/:userId",getReviewByUserId);
app.get("/api/project/getMovieReview/:movieId",getReviewByMovieId);
app.get("/api/reviews",getAllReviews);
app.put("/api/:userId/thumbsUp/:reviewId",thumbsUp);
app.put("/api/:userId/dislike/:reviewId",dislike);
app.get("/api/project/:mid/review", findUserReviewsforMovie);
app.get("/api/project/:mid/critic/review", findCriticReviewsforMovie);
app.get("/api/project/userReview/:reviewId", findReviewById);



function getAllReviews(req,res) {
    movieProjectModel
        .findAllReview()
        .then(function (response)
        {
            console.log(response);
            res.json(response);
        });
}




function getReviewByUserId(req,res) {
    var userId=req.params.userId;
    movieProjectModel
        .findReviewByUserId(userId)
        .then(function (reviews) {
            // console.log(reviews);
            res.json(reviews);
        });
}

function getReviewByMovieId(req,res) {
    console.log("review in server");
    var movieId= req.params.movieId;
    movieProjectModel.findReviewByMovieId(movieId)
        .then(function (reviews) {
            //console.log(reviews);
            res.json(reviews);
        });
}

function thumbsUp(req,res) {
    var reviewId=req.params.reviewId;
    var userId=req.params.userId;
    movieProjectModel.thumbsUp(reviewId,userId)
        .then(function (response) {
            res.json(response);
        });
}

function dislike(req,res) {
    var reviewId=req.params.reviewId
    var userId=req.params.userId;
    movieProjectModel.dislike(reviewId,userId)
        .then(function (response) {
            res.json(response);
        });
}



function createReview(req,res) {
    var review=req.body;
    console.log(review);
    movieProjectModel.createReview(review)
        .then(function (response) {
            console.log("in revieww");
            console.log(response);
            res.sendStatus(200);
        });
}

function deleteReviewsforUser(req, res) {
    var userID = req.params.userId;
    console.log("Boli" + userID)
    movieProjectModel
        .deleteReviewsforUser(userID)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllReviews(req, res) {
    var userId = req.params.userId;
    movieProjectModel
        .findAllReviews(userId)
        .then(function (reviews) {
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findUserReviewsforMovie(req, res) {
    var movieId = req.params.mid;
    movieProjectModel
        .findUserReviewsforMovie(movieId)
        .then(function (reviews) {
            // console.log("reviews:"+reviews);
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findCriticReviewsforMovie(req, res) {
    var movieId = req.params.mid;
    movieProjectModel
        .findCriticReviewsforMovie(movieId)
        .then(function (reviews) {
            // console.log("reviews:"+reviews);
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findReviewsforMovie(req, res) {
    var movieId = req.params.mid;
    movieProjectModel
        .findReviewsforMovie(movieId)
        .then(function (reviews) {
            // console.log("reviews:"+reviews);
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findReviewById(req, res) {
    var ReviewId = req.params.reviewId;
    movieProjectModel
        .findReviewById(ReviewId)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function updateReview(req, res) {
    var reviewId = req.params.reviewId;
    var review = req.body;
    movieProjectModel
        .updateReview(reviewId, review)
        .then(function (website) {
            res.json(website);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function deleteReview(req, res) {
    var reviewId = req.params.reviewId;
    movieProjectModel
        .deleteReview(reviewId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function movieListByTitle(req,res) {
var movieName = req.params['movie'];
var options =
    {

    host:"www.omdbapi.com",
    path:"/?s="+movieName+"&apikey=509f6a23"

};
var callback = function (response) {
var str = '';

response.on('data', function (data) {
    str += data;
});

response.on('end', function ()
{
    res.writeHead(200,
            {"Content-Type": "application/json"});
    res
        .end(str);
});
};

http.get(options,callback);

}

function searchMovieByImdbId(req,res) {
var imdbID = req.params['id'];
console.log(imdbID);
var options ={
host:"www.omdbapi.com",
path:"/?i="+imdbID+"&apikey=509f6a23"

};
var callback = function (response) {
var str = '';
response.on('data', function (data) {
    str += data;
});
response.on('end', function () {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(str);
});
};
http.get(options,callback);
}

