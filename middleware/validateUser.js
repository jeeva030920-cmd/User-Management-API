// Validation middleware
// Ensures incoming user data is well-formed before it reaches the route handler.

function validateUser(req, res, next) {
  const { name, email, age } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push("Name is required and must be a non-empty string.");
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("A valid email address is required.");
  }

  if (age !== undefined && (typeof age !== "number" || age < 0 || age > 150)) {
    errors.push("Age must be a number between 0 and 150.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

// A lighter version for PUT requests where fields are optional but must be valid if present.
function validateUserUpdate(req, res, next) {
  const { name, email, age } = req.body;
  const errors = [];

  if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
    errors.push("Name must be a non-empty string.");
  }

  if (email !== undefined && (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    errors.push("Email must be a valid email address.");
  }

  if (age !== undefined && (typeof age !== "number" || age < 0 || age > 150)) {
    errors.push("Age must be a number between 0 and 150.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = { validateUser, validateUserUpdate };
