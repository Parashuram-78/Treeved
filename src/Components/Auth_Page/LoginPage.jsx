import React, { useState } from "react";
import logo from "../../Images/logo2.png";

import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import GoogleButton from "react-google-button";
import "../../App.css";

function Login({ Login, error }) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };
  return (
    <div style={{ width: "500px", height: "500px", position: "relative" }}>
      <form onSubmit={submitHandler}>
        <div
          className="form-inner"
          style={{ width: "500px", height: "500px", position: "relative" }}
        >
          <div style={{ marginTop: "10px", marginLeft: "220px" }}>
            <img src={logo} style={{ marginLeft: "25px" }} alt="" />
            <h1 style={{ marginTop: "-20px" }}>TreeVed</h1>
            <h2 style={{ marginTop: "-20px", marginLeft: "20px" }}>Login</h2>
          </div>
          {/* {(error !== "")?(<div className="error" style={{}}>{error}
        <h2>Login</h2>
        </div>): ""} */}
          <div className="form-group">
            <InputLabel htmlFor="name" id="name">
              Username:
            </InputLabel>
            <input
              type="text"
              name="username"
              id="name"
              style={{
                width: "500px",
                height: "50px",
                borderRadius: "5px",
                borderColor: "dodgerblue",
              }}
              required
              onChange={(e) => setDetails({ details, name: e.target.value })}
              value={details.name}
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="password" id="password">
              Password:
            </InputLabel>
            <input
              type="password"
              name="password"
              style={{
                width: "500px",
                height: "50px",
                borderRadius: "5px",
                borderColor: "dodgerblue",
              }}
              id="password"
              onChange={(e) =>
                setDetails({ details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <Button
            type="submit"
            value="Login"
            variant="contained"
            style={{
              height: "50px",
              width: "250px",
              marginLeft: "150px",
              marginTop: "-15px",
            }}
          >
            Login
          </Button>
          <div style={{ marginLeft: "155px" }}>
            <h3
              style={{
                marginLeft: "100px",
                marginBottom: "8px",
                marginTop: "5px",
              }}
            >
              OR
            </h3>
            <GoogleButton
              onClick={() => {
                console.log("Google button clicked");
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
