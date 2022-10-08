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

exports.addPost = addPost;
exports.getPosts = getPosts;
exports.getUserPosts = getUserPosts;
