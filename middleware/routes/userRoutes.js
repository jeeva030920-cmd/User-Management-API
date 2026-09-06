const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");
const requireApiKey = require("../middleware/auth");
const { validateUser, validateUserUpdate } = require("../middleware/validateUser");

// GET /users - retrieve all users
router.get("/", (req, res) => {
  res.status(200).json(userModel.getAllUsers());
});

// GET /users/:id - retrieve a single user
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = userModel.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: `User with id ${id} not found.` });
  }

  res.status(200).json(user);
});

// POST /users - create a new user (requires API key + validation)
router.post("/", requireApiKey, validateUser, (req, res) => {
  const newUser = userModel.createUser(req.body);
  res.status(201).json(newUser);
});

// PUT /users/:id - update an existing user (requires API key + validation)
router.put("/:id", requireApiKey, validateUserUpdate, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = userModel.updateUser(id, req.body);

  if (!updatedUser) {
    return res.status(404).json({ error: `User with id ${id} not found.` });
  }

  res.status(200).json(updatedUser);
});

// DELETE /users/:id - delete a user (requires API key)
router.delete("/:id", requireApiKey, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const deleted = userModel.deleteUser(id);

  if (!deleted) {
    return res.status(404).json({ error: `User with id ${id} not found.` });
  }

  res.status(204).send();
});

module.exports = router;
