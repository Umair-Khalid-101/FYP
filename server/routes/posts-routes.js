const express = require("express");
const { addPost } = require("../controllers/postsController");
const router = express.Router();

router.post("/newpost", addPost);

module.exports = router;
