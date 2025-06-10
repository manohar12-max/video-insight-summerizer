const express = require("express");
const  router = express.Router();
const {createVideo}=require("../controllers/videoControllers");
const { auth } = require("../middleware/authMiddleware");

router.post("/create", createVideo);
// router.post("/create", auth, createVideo);
module.exports = router;