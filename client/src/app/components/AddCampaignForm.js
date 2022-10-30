import React from "react";
import { useForm } from "react-hook-form";
import "./EditCampaignForm.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const AddCampaignForm = ({ user }) => {
  const history = useNavigate();
  const values = {
    title: "",
    description: "",
    enddate: "",
    campaignGoal: 0,
    walletAddress: "",
  };
  const { register, handleSubmit } = useForm({
    defaultValues: values,
  });
  let startdate = new Date().toISOString().slice(0, 10);

  const onSubmit = async (data) => {
    data.startdate = startdate;
    data.postedBy = user._id;
    data.posterName = user.name;
    data.permission = "pending";
    alert(JSON.stringify(data));
    await axios
      .post(`http://localhost:3001/funderr/newpost`, data)
      .then((response) => {
        console.log(response.data);
        toast.success("Campaign Created!", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
    setTimeout(() => {
      history("/Home");
    }, 3000);
  };
  return (
    <div className="main">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="mainform">
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="input"
        />

        <input
          {...register("description", { minLength: 2 })}
          placeholder="Description"
          className="input"
        />
        <input {...register("enddate")} type="date" className="input" />
        <input
          {...register("campaignGoal")}
          placeholder="Campaign Goal"
          className="input"
          type="number"
        />
        <input
          {...register("walletAddress")}
          placeholder="Wallet Address"
          className="input"
        />

        <button type="submit" className="button">
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaignForm;
