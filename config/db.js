const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Connected to mongodb"))
  .catch((error) => console.log(error.message));
