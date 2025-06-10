const express = require("express");
const  router = express.Router();
const {getMetaData,getTranscript}=require("../controllers/videoControllers");
const { auth } = require("../middleware/authMiddleware");
const { route } = require("./userRoute");

router.post("/meta", auth, getMetaData);
router.post("/transcript/:videoId", auth, getTranscript); // Assuming you want to fetch transcript by videoId
// router.post("/create", auth, createVideo);
module.exports = router;