const messageModel = require("../models/messageModel");
const statusCodes = require("../constants/statusCodes");

const getMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find({})
      .sort({ created_at: "desc" })
      .populate("user");
    return res.status(statusCodes.success).json(messages);
  } catch (error) {
    console.log(error.message);
    return res
      .status(statusCodes.queryError)
      .json({ error: "Error while fetching messages" });
  }
};

const getMessageById = async (req, res) => {
  const { messageId } = req.params;

  if (!messageId)
    return res
      .status(statusCodes.missingParameters)
      .json({ error: "Missing parameters" });

  try {
    const message = await messageModel.findOne({ _id: messageId });
    return res.status(statusCodes.success).json(message);
  } catch (error) {
    console.log(error.message);
    return res
      .status(statusCodes.queryError)
      .json({ error: `Error while fetching message with id=${messageId}` });
  }
};

const addMessage = async (req, res) => {
  const { message, userId } = req.body;

  if (!message || !userId)
    return res
      .status(statusCodes.missingParameters)
      .json({ error: "Missing parameters" });

  try {
    const messageObj = new messageModel(message);
    await messageObj.save();
    return res.status(statusCodes.success).json(messageObj);
  } catch (error) {
    console.log(error.message);
    return res
      .status(statusCodes.queryError)
      .json({ error: "Error while adding message" });
  }
};

const editMessage = async (req, res) => {
  const { name } = req.body;
  const { messageId } = req.params;

  if (!name || !messageId)
    return res
      .status(statusCodes.missingParameters)
      .json({ error: "Missing parameters" });

  try {
    const message = await messageModel.findByIdAndUpdate(
      messageId,
      {
        name,
      },
      {
        new: true,
      }
    );
    return res.status(statusCodes.success).json(message);
  } catch (error) {
    console.log(error.message);
    return res
      .status(statusCodes.queryError)
      .json({ error: `Error while updating message with id=${messageId}` });
  }
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  if (!messageId)
    return res
      .status(statusCodes.missingParameters)
      .json({ error: "Missing parameters" });

  try {
    await messageModel.findByIdAndDelete(messageId);

    return res
      .status(statusCodes.success)
      .json({ message: `Message with id=${messageId} deleted` });
  } catch (error) {
    console.log(error.message);
    return res
      .status(statusCodes.queryError)
      .json({ error: `Error while deleting message with id=${messageId}` });
  }
};

module.exports = {
  getMessages,
  getMessageById,
  addMessage,
  editMessage,
  deleteMessage,
};
