import React, { useState } from "react";
import axios from "axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useQuery } from "react-query";
import CardComponent from "../components/Card";
import Grid from "@mui/material/Grid";

axios.defaults.withCredentials = true;
// let firstRender = true;

const Home = () => {
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isLoading, data } = useQuery("all-posts", () => {
    return axios.get("http://localhost:3001/funderr/allposts");
  });

  // console.log("Data: ", data.data.allposts);

  // const [user, setUser] = useState();
  // const refreshToken = async () => {
  //   const res = await axios
  //     .get("http://localhost:3001/funderr/refresh", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));

  //   const data = await res.data;
  //   return data;
  // };

  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:3001/funderr/user", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };

  // useEffect(() => {
  //   if (firstRender) {
  //     firstRender = false;
  //     sendRequest().then((data) => setUser(data.user));
  //   }
  //   let interval = setInterval(() => {
  //     refreshToken().then((data) => setUser(data.user));
  //   }, 1000 * 28);
  //   return () => clearInterval(interval);
  // }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div
        style={{
          margin: "1rem",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div onClick={() => history("/addCampaigns")}>
          <Fab variant="extended">
            <AddIcon sx={{ mr: 1 }} />
            Create Campaign
          </Fab>
        </div>
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              mr: "0.3rem",
            }}
          >
            <Tooltip title="Account">
              <IconButton
                onClick={handleClick}
                size="large"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => history("/Profile")}>
              <Avatar /> My Profile
            </MenuItem>
            <MenuItem onClick={() => history("/myCampaigns")}>
              <Avatar /> My Campaigns
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          All Campaigns
        </h1>
        <Grid container spacing={4} paddingLeft={8} paddingBottom={4}>
          {data.data.allposts.map((allposts) => (
            <Grid item xs={4}>
              <CardComponent posts={allposts} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Home;
