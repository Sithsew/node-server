const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/apiRoutes");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME;
app.use(bodyParser.json());

// Use API routes
app.use("/api", apiRoutes);

// Connect to MongoDB
mongoose
  .connect(`${DB_HOST}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log(`App started on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("An Error Occurred: ", error);
  });
