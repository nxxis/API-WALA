require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

const userRoute = require("./routes/userRoute");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use("/api/users", userRoute);
app.use(express.json());
app.use(errorMiddleware);

// routes
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/pranjal", function (req, res) {
  res.send("Hello Pranjal Cutie");
});

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at port ${PORT}`);
    });
    console.log("Connected to mongoDB database");
  })
  .catch((error) => {
    console.log(error);
  });
