import React, { useState } from "react";
import logo from "../../Images/logo2.png";
import { FcGoogle } from "react-icons/fc";
import {BiUser} from "react-icons/bi"
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import "../../App.css";

function Login() {
  const [details, setDetails] = useState({ name: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div style={{ width: "307px", height: "391px", position: "relative" }}>
      <form onSubmit={submitHandler}>
        <div className="form-inner" style={{ width: "307px", height: "391px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", flexDirection: "column",marginTop: "10px"}}>
            <img src={logo} style={{ width: "40px" }} alt="" />
            <h1 style={{ margin: "0px", fontSize: "20px", color:"#008fe4" }}>TreeVed</h1>
            {/* <h2 style={{ margin: "0px", fontSize: "20px", marginTop: "15px" }}>Sign In</h2> */}
          </div>
          <div className="form-group">
            <h1 className="label">Username:</h1>
            <input
              type="text"
              placeholder="Enter your username"
              style={{
                width: "239px",
                height: "26px",
                padding: "5px 10px",
                borderRadius: "4px",
                border: "none",
                outline: "none",

                background: "#ececec",
              }}
              required
              onChange={(e) => setDetails({ details, name: e.target.value })}
              value={details.name}
            />

            <h1 className="label">Password:</h1>
            <input
              type="password"
              placeholder="Enter your password"
              icon={<BiUser/>}
              style={{
                width: "239px",
                height: "26px",
                padding: "5px 10px",
                borderRadius: "4px",
                border: "none",
                outline: "none",

                background: "#ececec",
              }}
              id="password"
              onChange={(e) => setDetails({ details, password: e.target.value })}
              value={details.password}
            />
          </div>

          <div className="button-group">
            <button
              style={{
                height: "32px",
                width: "180px",
                outline: "none",
                border: "none",
                background: "#008fe4",
                borderRadius: "4px",
                fontFamily: "Noto Sans",
                color: "white",
              }}
            >
              Sign Up
            </button>

            <h4 className="separator">OR</h4>
            <button
              className="google-btn"
              onClick={() => {
                console.log("Google button clicked");
              }}
            >
              <FcGoogle />
              Sign In with Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
