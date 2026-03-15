const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "David" }
  ]);
});

app.listen(8001, () => {
  console.log("User service running on 8001");
});