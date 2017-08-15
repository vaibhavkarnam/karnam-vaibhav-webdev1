/**
 * Created by vaibhav on 09-08-2017.
 */
var mongoose1 = require("mongoose");

// mongoose1.connect("mongodb://localhost:27017/project");

var dbs = mongoose1.connection;

dbs.on('error', console.error.bind(console, 'connection error:'));

dbs.once('open', function()
{
    console.log("connected");
});


mongoose1.Promise=require("q").Promise;


require('./services/user.service.server.js');
require('./services/movie.service.server');