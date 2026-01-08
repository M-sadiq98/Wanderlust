const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
  .get(wrapAsync(listingsController.index))
  .post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingsController.createListing));


//new route
router.get("/new",isLoggedIn, listingsController.newListingForm);

router.route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(isLoggedIn, isOwner, validateListing, upload.single("listing[image]"), wrapAsync(listingsController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.editListingForm));

module.exports = router;    
