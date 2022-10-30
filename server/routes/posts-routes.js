const express = require("express");
const {
  addPost,
  getPosts,
  getUserPosts,
  deletePost,
  updatePost,
  postById,
  pendingPosts,
} = require("../controllers/postsController");
const { verifyToken } = require("../controllers/userController");
const router = express.Router();

router.post("/newpost", addPost);
router.get("/allposts", getPosts);
router.get("/userposts", verifyToken, getUserPosts);
router.delete("/deletepost/:id", deletePost);
router.patch("/editpost/:id", updatePost);
router.get("/post/:id", postById);
router.get("/pendingposts", pendingPosts);

module.exports = router;
