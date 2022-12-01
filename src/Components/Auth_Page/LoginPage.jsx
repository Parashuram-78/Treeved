/*global chrome*/
import React, { useState } from "react";
import logo from "../../Images/logo2.png";
import { FcGoogle } from "react-icons/fc";
import { BiUser } from "react-icons/bi";
import "../../App.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { firebaseConfig } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { initializeApp } from 'firebase/app'

export const firebase = initializeApp(firebaseConfig)
export const auth = getAuth(firebase)

function Login() {
  const router = useNavigate();
  const [username, setUserName] = useState("");
  const [error_message, setErrorMsg] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const googleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();


    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (chrome.runtime.lastError || !token) {
        alert(`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`)
        return
      }
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token)).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.\

        // console.log(result);
        //  console.log(result.user.getIdToken());
        result.user
          .getIdToken()
          .then((res) => {
            const ankur = res;
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            axios
              .post(
                "https://api-prod.treeved.com/v1/auth/social/signin/google-oauth2/",
                {
                  access_token: ankur,
                },
                config
              )
              .then((res) => {
                console.log(res);
                if (res.status == "200") {
                  setLoading(false);
                  console.log(res);
                  localStorage.setItem("accessTokenTreeVed", res.data.access);
                  localStorage.setItem("refreshTokenTreeved", res.data.refresh);

                  enqueueSnackbar("Logged in successfully", {
                    variant: "success",
                  });
                  router("/");
                }
              })
              .catch((e) => {
                console.log("Error Google login", e);
                console.log(e);
                let message = "Account does not exist. Please Sign up.";
                if (e.response) {
                  if (
                    e.response.data.message ===
                    "Account does not exist. Please Sign up."
                  ) {
                    setErrorMsg("Please Signup first in the platform");
                    message = "Please Signup first in the platform";
                  }
                  enqueueSnackbar(message, {
                    variant: "error",
                  });
                  setLoading(false);
                }
              });
          })
          .catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      });

    })


  };
  const signinHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    Promise.resolve(
      axios.post(
        "https://api-prod.treeved.com/v1/auth/login/",
        {
          username,
          password,
        },
        config
      )
    )
      .then((res) => {
        if (res.status == "200") {
          setLoading(false);
          console.log(res);
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
          if (
            e.response.data.message === "Please Signup first in the platform"
          ) {
            setErrorMsg("Please Signup first in the platform");
            message = "Please Signup first in the platform";
          }
          enqueueSnackbar(message, {
            variant: "error",
          });
          setLoading(false);
          //dispatch(userLoginFail(e.response.data.error));
        }
      });
  };

  return (
    <>
      {loading && <Loader />}
      <div
        style={{
          width: "307px",
          height: "391px",
          position: "relative",
          alignItems: "center",
        }}
      >
        <form onSubmit={signinHandler}>
          <div
            className="form-inner"
            style={{ width: "307px", height: "300px", position: "relative" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <img src={logo} style={{ width: "40px" }} alt="" />
              <h1 style={{ margin: "0px", fontSize: "20px", color: "#008fe4" }}>
                TreeVed
              </h1>
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
            </div>
          </div>
        </form>
        <div className="button-group1">
          <h4 className="separator">OR</h4>
          <button className="google-btn" onClick={googleLogin}>
            <FcGoogle />
            Sign In with Google
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
