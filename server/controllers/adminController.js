const posts = require("../models/posts");
const User = require("../models/userSignUpModel");

const acceptCampaign = async (req, res, next) => {
  const id = req.params.id;
  const options = { new: true };
  try {
    const result = await posts.findByIdAndUpdate(
      id,
      {
        $set: {
          permission: "accepted",
        },
      },
      options
    );
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }
};

exports.acceptCampaign = acceptCampaign;
