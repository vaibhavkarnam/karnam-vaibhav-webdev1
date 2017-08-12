/**
 * Created by vaibhav on 02-08-2017.
 */
var app=require('../../express');

var https =require('https');


app.get("/api/search/:movie",searchMovieByTitle);
app.get("/api/id/:id",searchMovieByImdbId);


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
            path:"?s="+movieTitle+"&apikey=509f6a23"

        };
        //console.log(options.path);
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
        https.get(options,callback);
    }

    function searchMovieByImdbId(req,res) {
        var imdbID = req.params['id'];
        var options ={
            host:"www.omdbapi.com",
            path:"?s="+imdbID+"&apikey=509f6a23"

        };
        //console.log(options.path);
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
        https.get(options,callback);
    }

