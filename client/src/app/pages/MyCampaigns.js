import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CardComponent from "../components/Card";
axios.defaults.withCredentials = true;

const MyCampaigns = () => {
  const [userCampaigns, setUserCampaigns] = useState();

  const getUserCampaigns = async () => {
    const res = await axios
      .get("http://localhost:3001/funderr/userposts", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log("Currently logged Users Posts: ", userCampaigns);

  useEffect(() => {
    getUserCampaigns().then((posts) => setUserCampaigns(posts.userposts));
  }, []);

  if (!userCampaigns) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (userCampaigns) {
    return (
      <div>
        <h1>UserPosts</h1>
        {userCampaigns.map((userpost) => (
          // <div>
          //   <div>Title: {userpost.title}</div>
          //   <div>Description: {userpost.description}</div>
          //   <div>PostedBy: {userpost.posterName}</div>
          //   <div>StartDate: {userpost.startdate}</div>
          //   <div>EndDate: {userpost.enddate}</div>
          //   <div>CampaignGoal: {userpost.campaignGoal} ETH</div>
          // </div>
          <div>
            <CardComponent posts={userpost} />
          </div>
        ))}
      </div>
    );
  }
};

export default MyCampaigns;
