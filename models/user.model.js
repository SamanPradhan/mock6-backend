const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  avatar: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };

// {
//   "username": "Saman",
//   "avatar": "String",
//   "email": "String",
//   "password": "1234",
// }
