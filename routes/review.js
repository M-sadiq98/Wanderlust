const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const reviewsController = require("../controllers/reviews.js");

//Reviews
//post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewsController.destroyReview));

module.exports = router;
