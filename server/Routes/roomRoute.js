// ChatRoomRoutes.js
const express = require("express");
const {createChatRoom, userChatRooms} = require("../Controllers/roomController");

const router = express.Router();

router.post("/", createChatRoom);
router.get("/:userId", userChatRooms);
//router.get("/find/:roomId", findChatRoom);

module.exports = router;
