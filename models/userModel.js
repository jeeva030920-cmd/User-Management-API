// In-memory "database" of users.
// In a real project this would be replaced with a real database (e.g. MongoDB, PostgreSQL).

let users = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", age: 28 },
  { id: 2, name: "Alan Turing", email: "alan@example.com", age: 34 }
];

let nextId = 3;

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser({ name, email, age }) {
  const newUser = { id: nextId++, name, email, age };
  users.push(newUser);
  return newUser;
}

function updateUser(id, updates) {
  const user = getUserById(id);
  if (!user) return null;

  if (updates.name !== undefined) user.name = updates.name;
  if (updates.email !== undefined) user.email = updates.email;
  if (updates.age !== undefined) user.age = updates.age;

  return user;
}

function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
