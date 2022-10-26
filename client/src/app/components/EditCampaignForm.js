import React from "react";
import { useForm } from "react-hook-form";
import "./EditCampaignForm.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

axios.defaults.withCredentials = true;

const EditCampaignForm = ({ preloadedValues }) => {
  const history = useNavigate();
  const { id } = useParams();
  const values = {
    title: preloadedValues.title,
    description: preloadedValues.description,
    enddate: preloadedValues.enddate.split("T")[0],
    campaignGoal: preloadedValues.campaignGoal,
  };
  const { register, handleSubmit } = useForm({
    defaultValues: values,
  });

  const onSubmit = async (data) => {
    alert(JSON.stringify(data));
    await axios
      .patch(`http://localhost:3001/funderr/editpost/${id}`, data)
      .then((response) => {
        console.log(response.data);
        toast.success("Campaign Updated!", {
          position: toast.POSITION.TOP_LEFT,
        });
      });
    setTimeout(() => {
      history("/myCampaigns");
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

        <button type="submit" className="button">
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default EditCampaignForm;
