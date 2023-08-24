const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { blogRouter } = require("./routes/blog.route");
const { auth } = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Home");
});
app.use("/api/users/", userRouter);
app.use(auth);
app.use("/api/blogs/", blogRouter);
const PORT = 4500;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB connected ");
  } catch (error) {
    console.log("DB not connected ");
  }
  console.log("server running at ", PORT);
});
