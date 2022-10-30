import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import Home from "./Home";
axios.defaults.withCredentials = true;
const HomePage = () => {
  const [user, setUser] = useState(null);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/funderr/user")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  console.log("User: ", user);

  return (
    <div>{/* {user.role === "admin" ? <AdminDashboard /> : <Home />} */}</div>
  );
};

export default HomePage;
