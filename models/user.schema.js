const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
    },
    name: {
      type: String,
    //   required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      trim: true,
      lowercase: true,
      minlength: [5, "Email must be at least 5 characters long"],
      maxlength: [100, "Email cannot exceed 100 characters"],
    },
    password: {
      type: String,
    //   required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profileImage: {
      type: String,
    },
    boards: {
        type: Array,
        default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(plm)

module.exports = mongoose.model("User", userSchema);

// module.exports = user;
