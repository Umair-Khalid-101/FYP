const posts = require("../models/posts");

const addPost = async (req, res, next) => {
  const { title, description, enddate, postedBy, startdate, campaignGoal } =
    req.body;
  const post = new posts({
    title,
    description,
    enddate,
    postedBy,
    startdate,
    campaignGoal,
  });
  try {
    await post.save();
  } catch (error) {
    console.log(error);
  }
  return res.status(201).json({ message: post });
};

exports.addPost = addPost;
