const express = require("express");
const proxy = require("http-proxy-middleware");

const app = express();

app.use(
  "/users",
  proxy({
    target: "http://user-service:8001",
    changeOrigin: true
  })
);

app.use(
  "/orders",
  proxy({
    target: "http://order-service:8002",
    changeOrigin: true
  })
);

app.listen(8000, () => {
  console.log("API Gateway running on port 8000");
});