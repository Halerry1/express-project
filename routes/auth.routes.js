const router = require("express").Router();

// import auth controller
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.getUser);
router.get("/logout", authController.logout);

module.exports = router;
