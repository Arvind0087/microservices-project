const express = require("express");
const app = express();

app.get("/orders", (req, res) => {
  res.json([
    { id: 1, name: "Order 1" },
    { id: 2, name: "Order 2" },
  ]);
});

app.listen(8002, () => {
  console.log("Order service running on 8002");
});
