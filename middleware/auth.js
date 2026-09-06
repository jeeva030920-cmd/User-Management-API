// Authentication middleware
// Requires a valid API key in the "x-api-key" header for write operations
// (POST, PUT, DELETE). This is a simple demonstration; in production you'd
// use something more robust like JWTs or OAuth.

const API_KEY = process.env.API_KEY || "supersecretkey123";

function requireApiKey(req, res, next) {
  const providedKey = req.header("x-api-key");

  if (!providedKey || providedKey !== API_KEY) {
    return res.status(401).json({
      error: "Unauthorized: missing or invalid API key. Include an 'x-api-key' header."
    });
  }

  next();
}

module.exports = requireApiKey;
