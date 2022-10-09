import React, { useEffect, useState } from "react";
import axios from "axios";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

axios.defaults.withCredentials = true;

const Profile = () => {
  const history = useNavigate();

  const [user, setUser] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/funderr/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

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
        <h1>My Profile</h1>
        {user && <h2>Full Name: {user.name}</h2>}
        {user && <h2>Email: {user.email}</h2>}
      </div>
    </div>
  );
};

export default Profile;
