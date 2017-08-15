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

module.exports = movieProjectModel;

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
