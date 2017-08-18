(function () {

angular
.module('cineReview')
.factory('userService', userService);

function userService($http) {
var api ={
createUser: createUser,
findUserById: findUserById,
findUserbyUsername: findUserbyUsername,
findUserbyCredentials : findUserbyCredentials,
updateUser: updateUser,
deleteUser:deleteUser,
followVisitedUser : followVisitedUser,
findfollowingUser : findfollowingUser,
findfollowersforUser : findfollowersforUser,
removeFollowing : removeFollowing,
findAllUsers : findAllUsers,
addFollowers : addFollowers,
loggedin:loggedin,
register:register,
removeFollower : removeFollower,
login: login,
logout: logout
};

return api;

function findUserbyCredentials(username, password)
{
var url = "/api/project/user?username="+username+"&password="+password;
return $http.get(url)
.then(function (response)
{
    // console.log("found");
    return response.data;
})
}

function findUserbyUsername(username)
{
var url = "/api/project/user?username="+username;
return $http.get(url)
.then(function (response)
{
    return response.data;
})
}

function createUser(user)
{
var url = "/api/project/user";
// console.log("creating userrrr");
// console.log(user);
return $http.post(url, user)
.then(function (response)
{
    return response.data;
})
}

function findUserById(userId)
{
var url = "/api/project/user/"+userId;
return $http.get(url)
.then(function (response)
{
    return response.data;
})
}


function findAllUsers()
{
var url = "/api/project/user";
return $http.get(url)
.then(function (response)
{
    return response.data;
});
}


function logout()
{
var url = "/api/logout";
return $http.post(url)
.then(function (status)
{
    return status;
});
}

function addFollowers(followingUsers)
{
return $http
.post("/api/project/addNewfollowers" , followingUsers);
}

function followVisitedUser(followingUsers)
{

return $http
.post("/api/project/followVisitedUser" , followingUsers);
}



function login(username,password)
{
var url="/api/login";
credentials={
username:username,
password:password
};

return $http
.post(url,credentials)
.then(function (response)
{
    return response.data;
});
}




function updateUser(userId, user)
{
var url = "/api/project/user/"+userId;
return $http
.put(url, user)
.then(function (response)
{
    return response.data;
});

}


function register(user) {
var url = "/api/register";
return $http.post(url, user)
.then(function (response)
{
    return response.data;
});
}


function deleteUser(userId)
{
var url = "/api/project/user/"+userId;
return $http.delete(url)
.then(function (status)
{
    return status;
});
}


function findfollowingUser(userId) {
return $http
.get("/api/project/followingforUser/" + userId);
}


function loggedin() {
var url = "/api/loggedin";
return $http.get(url)
.then(function (response)
{
    return response.data;
});
}

function findfollowersforUser(userId)
{
return $http
.get("/api/project/followersforUser/" + userId);
}



function removeFollowing(followingUser)
{
return $http
.post("/api/project/followingDelete" , followingUser);
}

function removeFollower(followingUser)
{
return $http
.post("/api/project/followersDelete" , followingUser);
}


}
})();
