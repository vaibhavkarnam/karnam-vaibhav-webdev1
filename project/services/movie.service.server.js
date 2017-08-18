/**
* Created by vaibhav on 02-08-2017.
*/
var app=require('../../express');

var http =require('http');

var movieProjectModel = require("../models/movie/movie.model.server");

app.delete("/api/project/userReview/:reviewId", deleteReview);
app.get("/api/search/movieName/:movie",movieListByTitle);
app.put("/api/project/userReview/:reviewId", updateReview);
app.get("/api/project/movie/id/:id",searchMovieByImdbId);
app.post("/api/project/user/:userId/review", createReview);
app.get("/api/project/getMovieReview/:movieId",getReviewByMovieId);
app.put("/api/:userId/dislike/:reviewId",dislike);
app.get("/api/project/userReview/:reviewId", findReviewByReviewId);
app.post("/api/project/user/del/:userId/review", deleteReviews);
app.get("/api/project/getReviewForUser/:userId",findReviewforUserId);
app.get("/api/reviews",getReviews);
app.put("/api/:userId/thumbsUp/:reviewId",thumbsUp);


var APIKey = process.env.IMDB;

function findReviewforUserId(req,res) {
var userId=req.params.userId;

movieProjectModel
.getReviewforUserId(userId)
.then(function (reviews)
{
    // console.log(reviews);
    res.json(reviews);
});
}

function findReviewByReviewId(req, res)
{
var reviewId = req.params.reviewId;
movieProjectModel
.findReviewByReviewId(reviewId)
.then(function (response)
{
    res.json(response);
});
}

function getReviews(req,res)
{
movieProjectModel
.findReview()
.then(function (response)
{
    console.log(response);
    res.json(response);
});
}

function getReviewByMovieId(req,res)
{
// console.log("review in server");
var movieReviewId = req.params.movieId;
movieProjectModel.
getReviewforMovieId(movieReviewId)
.then(function (reviews)
{
    //console.log(reviews);
    res.json(reviews);
});
}

function thumbsUp(req,res) {
var userReviewId = req.params.reviewId;
var userId = req.params.userId;
movieProjectModel
.thumbsUp(userReviewId,userId)
.then(function (response)
{
    res.json(response);
});
}

function createReview(req,res)
{
var obj=req.body;
// console.log(review);
movieProjectModel
.createReview(obj)
.then(function (response)
{
    // console.log("in revieww");
    // console.log(response);
    res.sendStatus(200);
});
}

function deleteReviews(req, res)
{
var userId = req.params.userId;
movieProjectModel
.deleteReviews(userId)
.then(function (status)
{
    res.sendStatus(200);
});
}

function updateReview(req, res)
{
var review = req.body;
var Id = req.params.reviewId;
movieProjectModel
.updateReview(Id, review)
.then(function (response)
{
    res.json(response);
});
}

function dislike(req,res)
{
var movieReviewId  =  req.params.reviewId;
var userId  =  req.params.userId;
movieProjectModel
.dislike(movieReviewId,userId)
.then(function (response)
{
    res.json(response);
});
}


function deleteReview(req, res)
{
var Id = req.params.reviewId;
movieProjectModel
.deleteReview(Id)
.then(function (status)
{
    res.sendStatus(200);
});
}

function movieListByTitle(req,res) {

var movieName = req.params['movie'];
var options =
{

host:"www.omdbapi.com",
path:"/?s="+movieName+"&apikey=API_KEY"
.replace("API_KEY",APIKey)

};
var callback = function (response)
{
var str = '';

response.on('data', function (data)
{
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
path:"/?i="+imdbID+"&apikey=API_KEY"
.replace("API_KEY",APIKey)

};
var callback = function (response)
{
var str = '';
response.on('data', function (data)
{
str += data;
});
response.on('end', function ()
{
res.writeHead(200, {"Content-Type": "application/json"});
res.end(str);
});
};
http.get(options,callback);
}

