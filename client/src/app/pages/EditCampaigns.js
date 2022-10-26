import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditCampaignForm from "../components/EditCampaignForm";

axios.defaults.withCredentials = true;

export default function EditCampaigns() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setPost(await axios.get(`http://localhost:3001/funderr/post/${id}`));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("DATA: ", post);

  return post ? (
    <EditCampaignForm preloadedValues={post.data.newpost} />
  ) : (
    <div>LOADINGG....</div>
  );
}
