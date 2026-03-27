const express = require("express");

const app = express();

//application level settings
app.set("view engine", "ejs");

//routing
app.get("/", (req, res) => {
  res.send("home page");
});

app.post("/api/data", (req, res) => {
  res.json({
    message: "Data received",
    data: req.body,
  });
});


//error handling middleware
// 👉 Error middleware = server crash না করে error handle করে
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});