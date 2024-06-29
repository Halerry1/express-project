const router = require("express").Router();

// import message controller
const messageController = require("../controllers/message.controller");

router.get("/", messageController.getMessages);
router.get("/:messageId", messageController.getMessageById);
router.post("/", messageController.addMessage);
router.put("/:messageId", messageController.editMessage);
router.delete("/:messageId", messageController.deleteMessage);

module.exports = router;
