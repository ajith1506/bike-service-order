const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConfig = require("./config/dbconfig");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./services/orderService");

app.use(cors());

mongoose
  .connect(
    `mongodb+srv://ajithkumararun1111:${dbConfig.PASSWORD}@cluster0.c3bzoik.mongodb.net/${dbConfig.DBNAME}?retryWrites=true&w=majority`
  )

  .catch((err) => {
    console.log("Database Connection Error: " + err);
  });

let db = mongoose.connection;

// //To check Database Connection
db.once("open", function () {
  console.log("Connected to MongoDb Database");
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// //For preventing CORS ERRORS  (Postman is just a testing tool)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

//Every request from admin route goes through this url : /admin
app.use("/order", orderRoutes);

//Server Side Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is listening on order ${port}`);
});
