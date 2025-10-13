// Routes for media-related actions (user watchlist)

const express = require("express");
const router = express.Router();

const {
  addMediaToList,
  getUserMediaList,
  removeMediaFromList,
  updateMediaStatus, // placeholder
} = require("../controllers/media.controller");

const { verifyAccessToken } = require("../middleware/verifyAccessToken");
const {
  validateAddMedia,
  validateDeleteMedia,
  validateUpdateMedia, // placeholder
} = require("../middleware/mediaValidators");

const handleValidationErrors = require("../middleware/handleValidationErrors");

// Add a media item (movie or show) to user's watchlist
router.post(
  "/add",
  verifyAccessToken,
  validateAddMedia,
  handleValidationErrors,
  addMediaToList
);

// Get all media items from the user's list
router.get("/list", verifyAccessToken, getUserMediaList);

// Remove a media item from the user's list by tmdbId
router.delete(
  "/delete/:tmdbId",
  verifyAccessToken,
  validateDeleteMedia,
  handleValidationErrors,
  removeMediaFromList
);

// Update status/progress of a media item (placeholder)
router.patch(
  "/update/:tmdbId",
  verifyAccessToken,
  validateUpdateMedia,
  handleValidationErrors,
  updateMediaStatus
);

module.exports = router;
