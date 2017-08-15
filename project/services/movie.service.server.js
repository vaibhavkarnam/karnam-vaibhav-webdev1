/**
* Created by vaibhav on 02-08-2017.
*/
var app=require('../../express');

var http =require('http');
var movieProjectModel = require("../models/movie/movie.model.server");

app.get("/api/search/:movie",searchMovieByTitle);
app.get("/api/id/:id",searchMovieByImdbId);
app.post("/api/user/:userId/review", createReview);
app.post("/api/user/del/:userId/review", deleteReviewsforUser);
app.get("/api/user/:userId/review", findAllReviews);
app.get("/api/rest/:mid/review", findUserReviewsforMovie);
app.get("/api/rest/:mid/critic/review", findCriticReviewsforMovie);
app.get("/api/review/:reviewId", findReviewById);
app.put("/api/review/:reviewId", updateReview);
app.delete("/api/review/:reviewId", deleteReview);
app.get   ("/api/getReviewByUserId/:userId",getReviewByUserId);
app.delete("/api/review/:reviewId",deleteReview);
app.put   ("/api/review/:reviewId",updateReview);
app.get   ("/api/review/:reviewId",findReview);

function getReviewByUserId(req,res) {
    var userId=req.params.userId;
    movieProjectModel.findReviewByUserId(userId)
        .then(function (reviews) {
            //console.log(reviews);
            res.json(reviews);
        });
}

function findReview(req,res) {
    var reviewId=req.params.reviewId;
    movieProjectModel.findReview(reviewId)
        .then(function (response) {
            res.json(response);
        });
}


function createReview(req,res) {
    var review=req.body;
    console.log(review);
    movieProjectModel.createReview(review)
        .then(function (response) {
            //console.log(response);
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

function searchMoviByImdbId(req, res) {
var imdbID = req.params['id'];
console.log("found");
var url = "http://www.omdbapi.com/?i="+imdbID+"&apikey=509f6a23";
return http.get(url, function (response) {
res.send(response);
});
}

function searchMovieBTitle(req, res) {
var movieTitle = req.params['movie'];
var url = "http://www.omdbapi.com/?s=" + movieTitle + "&apikey=509f6a23";
return http.get(url, function (response) {
res.send(response);
});

}

function searchMovieByTitle(req,res) {
var movieTitle = req.params['movie'];
var options ={
host:"www.omdbapi.com",
path:"/?s="+movieTitle+"&apikey=509f6a23"

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

