const express = require("express");

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "Order Service is running!", status: "ok" });
});

// Get all orders
app.get("/orders", (req, res) => {
  res.json({
    message: "Hello from Order Service!",
    orders: [
      { id: 1, userId: 1, product: "Laptop", qty: 1, status: "delivered" },
      { id: 2, userId: 2, product: "Phone", qty: 2, status: "shipped" },
      { id: 3, userId: 1, product: "Monitor", qty: 1, status: "pending" },
    ],
  });
});

// Get order by id
app.get("/orders/:id", (req, res) => {
  res.json({
    message: `Fetching order ${req.params.id} from Order Service`,
    order: {
      id: req.params.id,
      userId: 1,
      product: "Laptop",
      qty: 1,
      status: "delivered",
    },
  });
});

app.listen(8002, () => {
  console.log("✅ Order Service running on port 8002");
});
