import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CardComponent from "../components/MyCampaignCard";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";

axios.defaults.withCredentials = true;

const MyCampaigns = () => {
  const history = useNavigate();
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
        <div
          onClick={() => history("/home")}
          style={{
            margin: "1rem",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Fab variant="extended">
            <HomeIcon sx={{ mr: 1 }} />
            Home
          </Fab>
        </div>
        <div>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            My Campaigns
          </h1>
          <Grid container spacing={4} paddingLeft={8} paddingBottom={4}>
            {userCampaigns.map((allposts) => (
              <Grid item xs={4} key={Math.random()}>
                <CardComponent posts={allposts} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
};

export default MyCampaigns;
