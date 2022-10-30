import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./EditCampaignForm.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const history = useNavigate();
  const [user, setUser] = useState({});
  const values = {
    email: "",
    password: "",
  };
  const { register, handleSubmit } = useForm({
    defaultValues: values,
  });

  const success = () => {
    toast.success("Successfully Logged In!", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const fail = () => {
    toast.error("Wrong Email or Password!", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const onSubmit = async (data) => {
    alert(JSON.stringify(data));
    const token = await axios.post("http://localhost:3001/funderr/auth", data);
    console.log("Token: ", token.data);
    const userToken = token.data;
    await axios
      .get("http://localhost:3001/funderr/currentuser", {
        headers: {
          "x-auth-token": userToken,
        },
      })
      .then((result) => {
        const newUser = result.data;
        setUser(newUser);
      })
      .then(success())
      .catch((err) => {
        console.log(err);
        fail();
      });
  };

  useEffect(() => {
    console.log("UseEffect Called");
    console.log("User: ", user);
  }, [user]);

  return (
    <>
      <div>{user ? user.name : null}</div>
      <div>{user ? user.email : null}</div>
      <div className="main">
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)} className="mainform">
          <input
            {...register("email", { required: true })}
            placeholder="email"
            className="input"
          />

          <input
            {...register("password", { minLength: 2 })}
            placeholder="password"
            className="input"
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
