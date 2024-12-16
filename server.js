// const express = require("express");
// const mongoose = require('mongoose')
// require("dotenv").config()
// const app = express();
// const cors = require("cors");
// // const Router = require("./Route/UserRoute")
// const userRoutes = require("./Route/UserRoute");
// const listRoutes = require("./Route/ListRoute");
// const taskRoutes = require("./Route/TaskRoute");


// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/auth", userRoutes);
// app.use("/lists", listRoutes);
// app.use("/tasks", taskRoutes);



// const MONGOURL = process.env.MONGOURL
// mongoose.connect(MONGOURL)
// .then(()=>{
//   console.log("mongoose connected")
// })
// .catch(()=>{
//   console.log("not connected")
// })

// const port = process.env.PORT|| 5050
// app.listen(port, () => {
//   console.log(`server start on http://localhost:${port}`);
// });


const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Import routes
const userRoutes = require("./Route/UserRoute");
const listRoutes = require("./Route/ListRoute");
const taskRoutes = require("./Route/TaskRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", userRoutes);
app.use("/lists", listRoutes);
app.use("/tasks", taskRoutes);

// Database connection
const MONGOURL = process.env.MONGOURL;
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
  

// Start server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`server start on http://localhost:${port}`);
});
