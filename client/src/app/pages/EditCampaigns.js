import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "react-query";

axios.defaults.withCredentials = true;

const validationSchema = yup.object({
  title: yup.string("Enter a title").required("Title is required"),
  description: yup
    .string("Enter a description")
    .required("Description is required"),
  enddate: yup.date("Enter an EndDate").required("EndDate is required "),
  campaignGoal: yup
    .number("Enter a CampaignGoal")
    .required("CampaignGoal is required"),
});

const AddCampaigns = () => {
  const history = useNavigate();
  const { id } = useParams();
  const { isLoading, data } = useQuery("post-by-id", () => {
    return axios.get(`http://localhost:3001/funderr/post/${id}`);
  });
  console.log("Post:", data.data.newpost);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      enddate: "",
      campaignGoal: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Values: ", values);
      await axios
        .patch(`http://localhost:3001/funderr/editpost/${id}`, values)
        .then((response) => {
          console.log(response.data);
          toast.success("Campaign Updated!", {
            position: toast.POSITION.TOP_LEFT,
          });
        });
      // alert(JSON.stringify("New Campaign Created"));
      setTimeout(() => {
        history("/myCampaigns");
      }, 3000);
    },
  });

  if (!isLoading) {
    return (
      <>
        <ToastContainer />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <div style={{ margin: "1rem" }}>
              Previous Title: {data.data.newpost.title}
            </div>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <div style={{ margin: "1rem" }}>
              Previous Description: {data.data.newpost.description}
            </div>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <div style={{ margin: "1rem" }}>
              Previous EndDate: {data.data.newpost.enddate.split("T")[0]}
            </div>
            <TextField
              fullWidth
              id="enddate"
              name="enddate"
              label="End Date"
              type="date"
              value={formik.values.enddate}
              onChange={formik.handleChange}
              error={formik.touched.enddate && Boolean(formik.errors.enddate)}
              helperText={formik.touched.enddate && formik.errors.enddate}
            />
            <div style={{ margin: "1rem" }}>
              Previous CampaignGoal: {data.data.newpost.campaignGoal}
            </div>
            <TextField
              fullWidth
              id="campaignGoal"
              name="campaignGoal"
              label="Campaign Goal"
              type="number"
              value={formik.values.campaignGoal}
              onChange={formik.handleChange}
              error={
                formik.touched.campaignGoal &&
                Boolean(formik.errors.campaignGoal)
              }
              helperText={
                formik.touched.campaignGoal && formik.errors.campaignGoal
              }
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              style={{ marginTop: "1rem" }}
            >
              Update Campaign
            </Button>
          </form>
        </div>
      </>
    );
  } else {
    return <div>LOADINGGG......</div>;
  }
};

export default AddCampaigns;
