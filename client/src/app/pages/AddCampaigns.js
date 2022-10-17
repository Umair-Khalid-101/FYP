import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

  let startdate = new Date().toISOString().slice(0, 10);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      enddate: "",
      campaignGoal: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.startdate = startdate;
      values.postedBy = user._id;
      values.posterName = user.name;
      console.log("Values: ", values);
      await axios
        .post("http://localhost:3001/funderr/newpost", values)
        .then((response) => {
          console.log(response.data);
          toast.success("New Campaign Created!", {
            position: toast.POSITION.TOP_LEFT,
          });
        });
      // alert(JSON.stringify("New Campaign Created"));
      setTimeout(() => {
        history("/home");
      }, 3000);
    },
  });

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
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
            helperText={formik.touched.description && formik.errors.description}
            style={{ marginTop: "2rem" }}
          />
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
            style={{ marginTop: "2rem" }}
          />
          <TextField
            fullWidth
            id="campaignGoal"
            name="campaignGoal"
            label="Campaign Goal"
            type="number"
            value={formik.values.campaignGoal}
            onChange={formik.handleChange}
            error={
              formik.touched.campaignGoal && Boolean(formik.errors.campaignGoal)
            }
            helperText={
              formik.touched.campaignGoal && formik.errors.campaignGoal
            }
            style={{ marginTop: "2rem" }}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            style={{ marginTop: "2rem" }}
          >
            Create Campaign
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddCampaigns;
