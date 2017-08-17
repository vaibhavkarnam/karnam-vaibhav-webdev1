/**
 * Created by vaibhav on 13-08-2017.
 */
var mongoose = require("mongoose");
var movieProjectSchema = require("./movie.schema.server");
var movieProjectModel = mongoose.model("movieProjectModel", movieProjectSchema);
var userModelNew = require("../user/user.model.server");


movieProjectModel.createReview = createReview;
movieProjectModel.findReviewById = findReviewById;
movieProjectModel.updateReview = updateReview;
movieProjectModel.deleteReview = deleteReview;
movieProjectModel.findAllReviews = findAllReviews;
movieProjectModel.findUserReviewsforMovie = findUserReviewsforMovie;
movieProjectModel.findCriticReviewsforMovie = findCriticReviewsforMovie;
movieProjectModel.deleteReviewsforUser = deleteReviewsforUser;
movieProjectModel.findReviewByUserId=findReviewByUserId;
movieProjectModel.findReviewByUserId=findReviewByUserId;
movieProjectModel.findReviewById=findReviewById;
movieProjectModel.findReviewByMovieId = findReviewByMovieId;
movieProjectModel.findAllReview = findAllReview;
movieProjectModel.findAllReview = findAllReview;
movieProjectModel.thumbsUp = thumbsUp;
movieProjectModel.dislike = dislike;

module.exports = movieProjectModel;

function findAllReview() {
    return movieProjectModel.find()
        .populate();
}

function thumbsUp(reviewId,userId) {
    return movieProjectModel
        .findOne({_id:reviewId})
        .then(function (response) {
            var NewPos=response.dislike
                .indexOf(userId);
            var OldPos=response.thumbsUp
                .indexOf(userId);
            if(NewPos!==-1){
                response.dislike
                    .splice(NewPos,1);
            }
            if(OldPos===-1){

                response.thumbsUp.push(userId);
                response
                    .sort= response.thumbsUp.length
                    - response.dislike.length;
                return response.save();

            }
            else {
                return response.save();
            }
        });
}



function dislike(reviewId,userId) {
    return movieProjectModel
        .findOne({_id:reviewId})
        .then(function (response) {

            var NewIndex=response.dislike
                .indexOf(userId);
            var OldIndex=response.thumbsUp
                .indexOf(userId);
            if(OldIndex!==-1){
                response.thumbsUp.splice(OldIndex,1);
            }
            if(NewIndex===-1){
                response.dislike
                    .push(userId);
                response
                    .sort=response.thumbsUp.length
                    -response.dislike.length;

                return response.save();
            }
            else {
                return response.save();
            }
        });
}

function createReview(newReview, userId) {
    return movieProjectModel
        .create(newReview)
        .then(function (review) {
            userModelNew
                .addReview(review._id, userId );
            return review;
        })
}
function findReview(reviewId) {
    return movieProjectModel.findById(reviewId);
}

function findReviewByMovieId(movieId) {
    return movieProjectModel.find({movieID:movieId})
        .sort({sort:-1});
}

function findReviewByUserId(userId) {
    return movieProjectModel.find({ userID:userId});
}

function deleteReviewsforUser(userID) {
    return movieProjectModel.deleteMany({ _user : userID })
}

function findReviewById(userId) {
    return movieProjectModel.findById(userId)
}

function findAllReviews(userId) {
    return movieProjectModel.find({_user: userId})
}

function findUserReviewsforMovie(id) {
    return movieProjectModel.find({movieID: id, userRole: "USER"})
}

function findCriticReviewsforMovie(id) {
    return movieProjectModel.find({movieID: id, userRole: "CRITIC"})
}

function updateReview(reviewID, review) {
    return movieProjectModel.update(
        { _id : reviewID },
        {
            description: review.description
        })
}

function deleteReview(reviewID) {
    return movieProjectModel.findByIdAndRemove({_id: reviewID})
}
