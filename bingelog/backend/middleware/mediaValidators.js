// Validation for media routes (e.g. add, delete, update)

const { body, param } = require("express-validator");

const validStatuses = [
  "watching",
  "watched",
  "to_watch",
  "on_hold",
  "abandoned",
];

// Validate POST /media/add
const validateAddMedia = [
  body("tmdb_id")
    .trim()
    .notEmpty()
    .withMessage("tmdb_id is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("tmdb_id must be a positive integer"),

  body("status")
    .trim()
    .notEmpty()
    .withMessage("status is required")
    .bail()
    .isIn(validStatuses)
    .withMessage(`status must be one of: ${validStatuses.join(", ")}`),
];

// Validate DELETE /media/delete/:tmdbId
const validateDeleteMedia = [
  param("tmdbId")
    .trim()
    .notEmpty()
    .withMessage("tmdbId is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("tmdbId must be a valid number"),
];

// Validate PATCH /media/update/:tmdbId (placeholder for now)
const validateUpdateMedia = [
  param("tmdbId")
    .trim()
    .notEmpty()
    .withMessage("tmdbId is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("tmdbId must be a valid number"),
];

module.exports = {
  validateAddMedia,
  validateDeleteMedia,
  validateUpdateMedia,
};
