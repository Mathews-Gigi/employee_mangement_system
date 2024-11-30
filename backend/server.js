require("dotenv").config();
const express = require("express");
const db = require("./db/db.js");
const router = require("./router/router.js");
const cors = require("cors");

const app = express();
//db connection
db();
// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
// app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
// setting json acceptings
app.use(express.json());
// setting router
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello world");
  console.log("First end point ");
});

// to mange error

// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong",
//   });
// });

// listern to port

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running at", port);
});
