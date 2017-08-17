/**
* Created by vaibhav on 27-07-2017.
*/
var app1 = require('../../express');
var userModelNew = require('../models/user/user.model.server');

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

app1.post ('/api/login', passport.authenticate('local'),login);
app1.get ('/api/loggedin', loggedin);
app1.post ('/api/logout', logout);
app1.post ('/api/register', register);
app1.put("/api/project/deleteImage/:userId", deleteImage);



app1.get('/api/project/user/:userId', findUserById);
app1.get('/api/project/user', findAllUsers);
app1.post('/api/project/user', createUser);
app1.put('/api/project/user/:userId', updateUser);
app1.delete('/api/project/user/:userId', deleteUser);
app1.post("/api/project/followUser", FollowUser);
app1.get("/api/project/followingUser/:userId", findfollowingforUser);
app1.get("/api/project/followersUser/:userId", findfollowersforUser);
app1.post("/api/project/followingRemove", removeFromFollowing);
app1.post("/api/followers", addFollowers);
app1.get ('/api/getallusers',findAllUser);
app1.post('/api/remove/user/followers', removeFollowers);

var bcrypt = require("bcrypt-nodejs");

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL_PROJECT
}


var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


app1.get('/auth/project/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app1.get('/auth/project/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));

app1.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
app1.get('/auth/facebook/callback/', passport.authenticate('facebook', {
    successRedirect: 'project/#!/profile',
    failureRedirect: 'project/#!/login'
}));



var multer = require('multer');
var upload = multer({dest: __dirname + '/../../public/uploads'});
app1.post('/api/upload/project', upload.single('avatar-2'), uploadImage);


function localStrategy(username, password, done) {
    console.log(username);
    userModelNew
        .findUserByUsername(username)
        .then(function (user) {
            console.log(user);
            if (!user) {
                return done(null, false);
            }
            if (user.username === username && bcrypt.compareSync(password, user.password)) {
                console.log("found");
                return done(null, user);
            } else {
                return done(null, false);
            }
        }, function (err) {
            if (err) {
                return done(err);
            } else {
                return done(null, false);
            }
        });
}

function findAllUser(req,res) {
    userModelNew
        .findAllUser()
        .then(function (users) {
                res.json(users);
            },
            function (err) {
                res.sendStatus(404);
            });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModelNew
        .createUser(user)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.json(user);
                });
        });
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModelNew
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}
function deleteImage(req, res) {
    var userId = req.params.userId;
    //  var url = "images/defaultDisplayPic.jpg";
    userModelNew
        .uploadImage(userId)
        .then(
            function (stats) {
                res.send(stats);
            },
            function (error) {
                res.send(error);
            }
        );
}

function uploadImage(req, res) {

    var userId = req.body.userId;
    console.log("user is is"+ userId);

    var myFile = req.file;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var url = "/uploads/" + filename;

    userModelNew
        .ImageUpload(userId, url)
        .then(
            function (stats) {
                res
                    .redirect('/project/#!/profile');
            },
            function (error) {
                res.send(error);
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    userModelNew
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModelNew.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


function facebookStrategy(token, refreshToken, profile, done) {

    userModelNew
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if (user) {
                return done(null, user);
            } else {
                var newUser = {
                    username: profile.displayName.replace(/ /g, ""),
                    facebook: {
                        token: token,
                        id: profile.id
                    }
                };
                userModelNew
                    .createUser(newUser)
                    .then(function (user) {
                        return done(null, user);
                    }, function (err) {
                        return done(err, null);
                    });
            }
        }, function (err) {
            return done(err, null);
        });
}


function findAllUsers(req, res) {
var username = req.query['username'];
var password = req.query.password;
console.log(username);
console.log(password);
if(username && password)
{
    userModelNew
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}
else
    if(username)
    {
    userModelNew
        .findUserByUsername(username)
        .then(function (user) {
            if(user) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}
else
    {
    userModelNew
        .findAllUser()
        .then(function (users) {
            res.json(users);
        });
}
}


function findUserById(req, res) {
var userId = req.params['userId'];
userModelNew
    .findUserById(userId)
    .then(function (user) {
        res.json(user);
    });
}


function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModelNew
        .createUser(user)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.json(user);
                });
        });
}

function updateUser(req, res) {
var user = req.body;
userModelNew
    .updateUser(req.params.userId, user)
    .then(function (status) {
        res.send(status);
    });
}

function FollowUser(req, res) {
    var follow = req.body;
    console.log(follow);
    userModelNew.FollowUser(follow)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function addFollowers(req, res){

    var following = req.body;
    userModelNew
        .addFollowers(following._follower, following._following)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function removeFollowers(req, res) {
    console.log("removinnnnnn");
    var follow = req.body;
    userModelNew
        .remFollower(follow._follower, follow._following)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function removeFromFollowing(req, res) {
    var followingUser = req.body;
    userModelNew
        .remFollowing(followingUser._following, followingUser._follower)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}


function findfollowingforUser(req, res) {
    var userId = req.params.userId;
    userModelNew
        .findfollowingforUser(userId)
        .then(function (response) {
            console.log("FOllowing:" +response);
            res.json(response);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findfollowersforUser(req, res) {
    var userId = req.params.userId;
    userModelNew
        .findfollowersforUser(userId)
        .then(function (followers) {
            console.log("FOllowers:" +followers);
            res.json(followers);
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function deleteUser(req, res) {
var user = req.body;
userModelNew
    .deleteUser(req.params.userId)
    .then(function (status) {
        res.send(status);
    });
}

