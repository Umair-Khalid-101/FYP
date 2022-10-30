import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCampaignForm from "../components/AddCampaignForm";
axios.defaults.withCredentials = true;

const AddCampaigns = () => {
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
    <>
      <div>
        {user ? <AddCampaignForm user={user} /> : <div>LOADINGG....</div>}
      </div>
    </>
  );
};

export default AddCampaigns;
