const express = require("express");

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "User Service is running!", status: "ok" });
});

// Get all users
app.get("/users", (req, res) => {
  res.json({
    message: "Hello from User Service!",
    users: [
      { id: 1, name: "Arvind",  email: "arvind@example.com" },
      { id: 2, name: "Sanjay",  email: "sanjay@example.com" },
      { id: 3, name: "Priya",   email: "priya@example.com"  },
    ],
  });
});

// Get user by id
app.get("/users/:id", (req, res) => {
  res.json({
    message: `Fetching user ${req.params.id} from User Service`,
    user: { id: req.params.id, name: "Arvind", email: "arvind@example.com" },
  });
});

app.listen(8001, () => {
  console.log("✅ User Service running on port 8001");
});
