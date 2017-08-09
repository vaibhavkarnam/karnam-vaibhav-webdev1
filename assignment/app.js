/**
 * Created by vaibhav on 27-07-2017.
 */
var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/WebDevelopment'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137139.mlab.com:37139/heroku_d64prf40'; // user yours
}

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

mongoose.connect(connectionString);
require('./services/user.service.server.js');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');
