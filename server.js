const express = require("express");
const logger = require("./middleware/logger");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// Custom logging middleware (runs on every request)
app.use(logger);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the User Management API",
    endpoints: {
      "GET /users": "Get all users",
      "GET /users/:id": "Get a single user",
      "POST /users": "Create a user (requires x-api-key header)",
      "PUT /users/:id": "Update a user (requires x-api-key header)",
      "DELETE /users/:id": "Delete a user (requires x-api-key header)"
    }
  });
});

// Mount the user routes
app.use("/users", userRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
