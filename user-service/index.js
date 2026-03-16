const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Arvind" },
    { id: 2, name: "Sanjay" }
  ]);
});

app.listen(8001, () => {
  console.log("User service running on 8001");
});