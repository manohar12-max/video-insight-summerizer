const express = require("express");
const  router = express.Router();
const {
  getAllProfiles,
  createProfile,
  singleProfile,
  editProfile,
  deleteProfile,
  adminProfiles
  
} = require("../controllers/profileControllers");
const { auth } = require("../middleware/authMiddleware");


router.get("/", getAllProfiles);
router.get("/admin-profiles", auth, adminProfiles);
router.post("/create", auth, createProfile);
router.get("/:id", singleProfile);
router.put("/:id", auth, editProfile);
router.delete("/:id", auth, deleteProfile);


module.exports = router;
