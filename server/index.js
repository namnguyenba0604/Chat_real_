const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");

const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const userRoute = require("./Routes/userRoute");
const roomRoute = require("./Routes/roomRoute");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/rooms", roomRoute);

app.get("/", (req, res) => {
  res.send("Welcome to our chat API...");
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    }
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));