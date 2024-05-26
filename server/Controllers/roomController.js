// ChatRoomControllers.js
const chatRoomModel = require("../Models/chatRoomModel");

const createChatRoom = async (req, res) => {
  const { name, members } = req.body;

  try {
    const newChatRoom = new chatRoomModel({
      name,
      members,
    });

    const response = await newChatRoom.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
const userChatRooms = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatRoomModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};
const findChatRoom = async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const chatRoom = await chatRoomModel.findById(roomId).populate("members");
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createChatRoom, userChatRooms };
