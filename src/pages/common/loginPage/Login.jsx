import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../../requests/requestMethods";
import { useToastError } from "../../../utils/toastSettings";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/auth/login", inputs);
      if (res.data.type === "error") useToastError(res.data.message);
      else {
        signIn({
          token: res.data.accessToken,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            userId: res.data._id,
            profilePic: res.data.profilePicture,
            username: res.data.username,
            email: res.data.email,
            isAdmin: res.data.isAdmin,
          },
        });
        if (res.data.isAdmin) navigate("/admin");
        else navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="loginBodyContainer">
        <div className="loginFormContainer">
          <div className="left">
            <form onSubmit={handleLogin} className="loginForm">
              <h3>Welcome Back!</h3>
              <input
                placeholder="Email"
                onChange={handleInputs}
                name="email"
                type="email"
              />
              <input
                placeholder="Password"
                onChange={handleInputs}
                name="password"
                type="password"
              />
              <button onClick={handleLogin}>Login</button>
              <Link to="/register">Dont have an account? Register now</Link>
            </form>
          </div>
          <div className="right">
            <div className="logo">
              <h1 className="logoLeft">TRACK</h1>
              <h1 className="logoRight">r</h1>
            </div>
            <div className="tagline">
              Navigate Your Gaming Universe with Ease!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
