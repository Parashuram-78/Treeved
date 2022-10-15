import React, { useState } from "react";
import logo from "../../Images/logo2.png";
import { FcGoogle } from "react-icons/fc";
import { BiUser } from "react-icons/bi";
import "../../App.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
function Login() {
  const router = useNavigate();
  const [username, setUserName] = useState("");
  const [error_message, setErrorMsg] = useState(false);
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const signinHandler = (e) => {
    e.preventDefault();
    // setLoading(true);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    Promise.resolve(
      axios.post(
        "https://api-dev.treeved.com/v1/auth/login/",
        {
          username,
          password,
        },
        config
      )
    )
      .then((res) => {
        if (res.status == "200") {
          // setLoading(false);
          console.log(res);
          //localStorage.setItem("userId", res.data.result.userId);
          localStorage.setItem("accessTokenTreeVed", res.data.access);
          localStorage.setItem("refreshTokenTreeved", res.data.refresh);

          enqueueSnackbar("Logged in successfully", {
            variant: "success",
          });
          router("/");
        }
      })
      .catch((e) => {
        console.log(e);
        let message = "Login failed Invalid username/password !";
        if (e.response) {
          if (e.response.data.message === "Please Signup first in the platform") {
            setErrorMsg("Please Signup first in the platform");
            message = "Please Signup first in the platform";
          }
          enqueueSnackbar(message, {
            variant: "error",
          });
          //setLoading(false);
          //dispatch(userLoginFail(e.response.data.error));
        }
      });
  };

  return (
    <div style={{ width: "307px", height: "391px", position: "relative" }}>
      <form onSubmit={signinHandler}>
        <div className="form-inner" style={{ width: "307px", height: "391px", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <img src={logo} style={{ width: "40px" }} alt="" />
            <h1 style={{ margin: "0px", fontSize: "20px", color: "#008fe4" }}>TreeVed</h1>
          </div>
          {error_message && <p>{`${error_message}`}</p>}
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
              onChange={(e) => {
                setErrorMsg(false);
                setUserName(e.target.value);
              }}
            />

            <h1 className="label">Password:</h1>
            <input
              type="password"
              placeholder="Enter your password"
              icon={<BiUser />}
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
              onChange={(e) => {
                setErrorMsg(false);
                setPassword(e.target.value);
              }}
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
                cursor: "pointer",
              }}
              onClick={(e) => signinHandler(e)}
            >
              Sign In
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
