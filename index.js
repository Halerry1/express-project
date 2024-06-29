require("dotenv").config();
const startApp = require("./boot/setup").startApp;

(() => {
  try {
    startApp();
  } catch (error) {
    logger.info("Error in index.js => startApp");
    throw error;
  }
})();
