const router = require("express").Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    message: "All up and running !",
  });
});

module.exports = router;
