const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const USER_SERVICE_URL  = process.env.USER_SERVICE_URL  || "http://user-service:8001";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://order-service:8002";

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "API Gateway is running on Port 8000!", status: "ok" });
});

// Proxy /users → user-service
app.use("/users", createProxyMiddleware({ target: USER_SERVICE_URL, changeOrigin: true }));

// Proxy /orders → order-service
app.use("/orders", createProxyMiddleware({ target: ORDER_SERVICE_URL, changeOrigin: true }));

app.listen(8000, () => {
  console.log("✅ API Gateway running on port 8000");
  console.log("   /users  → " + USER_SERVICE_URL);
  console.log("   /orders → " + ORDER_SERVICE_URL);
});
