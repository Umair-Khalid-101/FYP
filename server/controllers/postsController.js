const posts = require("../models/posts");

const addPost = async (req, res, next) => {
  const {
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
  } = req.body;
  const post = new posts({
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
    posterName,
  });
  try {
    await post.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: post });
};

const getPosts = async (req, res, next) => {
  let allposts;
  try {
    allposts = await posts.find();
  } catch (error) {
    return new Error(error);
  }
  if (!allposts) {
    return res.status(400).json({ message: "No Posts found!" });
  }
  return res.status(200).json({ allposts });
};

const getUserPosts = async (req, res, next) => {
  let userposts;
  try {
    // const postedBy = req.params.id;
    const postedBy = req.id;
    userposts = await posts.find({ postedBy: postedBy });
  } catch (error) {
    return new Error(error);
  }
  if (!userposts) {
    return res.status(400).json({ message: "No User Posts found!" });
  }
  return res.status(200).json({ userposts });
};

const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await posts.findByIdAndUpdate(id, updates, options);
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    posts.deleteOne({ _id: postId }).then((result) => {
      res.status(200).json({ message: `Deleted Post: ${result.deletedCount}` });
    });
  } catch (error) {
    return new Error(error);
  }
};

const postById = async (req, res, next) => {
  try {
    newpost = await posts.findById(req.params.id);
  } catch (error) {
    return new Error(error);
  }
  if (!newpost) {
    return res.status(400).json({ message: "No Post found!" });
  }
  return res.status(200).json({ newpost });
};

exports.addPost = addPost;
exports.getPosts = getPosts;
exports.getUserPosts = getUserPosts;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.postById = postById;
