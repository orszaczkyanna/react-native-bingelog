// Controller for media actions (add, list, delete, update)

const dbPool = require("../config/db");

// Add media item to user watchlist
exports.addMediaToList = async (req, res) => {
  const userId = req.userId;
  const { tmdb_id, status } = req.body;

  try {
    // Check if media already exists for user
    const [existing] = await dbPool.query(
      "SELECT id FROM user_movies WHERE user_id = ? AND tmdb_id = ?",
      [userId, tmdb_id]
    );

    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "This item is already in your list" });
    }

    // Insert new item
    await dbPool.query(
      "INSERT INTO user_movies (user_id, tmdb_id, status) VALUES (?, ?, ?)",
      [userId, tmdb_id, status]
    );

    return res.status(201).json({ message: "Media item added to your list" });
  } catch (error) {
    console.error("Error adding media:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all media items for the current user
exports.getUserMediaList = async (req, res) => {
  const userId = req.userId;

  try {
    const [rows] = await dbPool.query(
      "SELECT tmdb_id, status, progress FROM user_movies WHERE user_id = ?",
      [userId]
    );

    return res.status(200).json({ items: rows });
  } catch (error) {
    console.error("Error fetching user media list:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a media item by tmdb_id
exports.removeMediaFromList = async (req, res) => {
  const userId = req.userId;
  // Parse tmdbId from URL as a base-10 integer (ensure decimal, not octal or hex)
  const tmdbId = parseInt(req.params.tmdbId, 10);

  try {
    const [result] = await dbPool.query(
      "DELETE FROM user_movies WHERE user_id = ? AND tmdb_id = ?",
      [userId, tmdbId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in your list" });
    }

    return res.status(200).json({ message: "Item removed from your list" });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Placeholder for update (e.g., status or progress)
exports.updateMediaStatus = async (req, res) => {
  return res
    .status(501)
    .json({ message: "Update functionality not implemented yet" });
};
