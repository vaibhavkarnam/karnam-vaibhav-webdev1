/**
 * Created by vaibhav on 02-08-2017.
 */
var app=require('../../express');

var https =require('https');


app.get("/api/search/:movie",searchMovieByTitle);
app.get("/api/id/:id",searchMovieByImdbId);


function searchMovieByImdbId(req, res) {
    var imdbID = req.params['id'];
    console.log("found");
    var url = "https://www.omdbapi.com/?i="+imdbID+"&apikey=509f6a23";
    return https.get(url, function (response) {
        res.send(response);
    });
}

function searchMovieByTitle(req, res) {
    var movieTitle = req.params['movie'];
    var url = "https://www.omdbapi.com/?s="+movieTitle+"&apikey=509f6a23";
    return https.get(url, function (response) {
        res.send(response);
    });


}