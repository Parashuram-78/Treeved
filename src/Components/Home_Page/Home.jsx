/*global chrome*/
import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import { BiSend, BiListUl } from "react-icons/bi";
import bookmark_img from "../../Images/bookmark.svg";
import bookmark_saved_img from "../../Images/bookmark_saved.svg";
import tick_img from "../../Images/tick.svg";
import tick_green_img from "../../Images/tick_green.svg";
import { AiFillStar } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import Navbar from "../Navigation/NavBar";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { PostAuthRequest } from "../Helper/AuthRequest";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { setUser, getUser } from "../../features/User/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { TagsGenerator } from "../Helper/tags";
import Loader from "../Loader/Loader";

const Home = () => {
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(4);
  const [bookmark, setBookmark] = useState(false);
  const [tick, setTick] = useState(false);
  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  // function copy() {
  //   chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  //     let tabUrl = tabs[0].url;
  //     // use `url` here inside the callback because it's asynchronous!
  //     const el = document.createElement("input");
  //     el.value = tabUrl;
  //     document.body.appendChild(el);
  //     el.select();
  //     document.execCommand("copy");
  //     document.body.removeChild(el);
  //     setUrl(el.value);
  //     setCopied(el.value);
  //   });
  // }
  // useEffect(() => {
  //   copy();
  // }, []);

  const check = () => {
    if (url.toString().trim().startsWith("https://") || url.toString().trim().startsWith("http://")) {
      return true;
    } else {
      return false;
    }
  };
  const submitHandler = () => {
    const successFxn = (res) => {
      navigate("/success/dairy");
    };
    const body = {
      user: {
        username: user.user.username,
        bio: user.user.bio,
      },
      text: desc,
      url: url,
      resource_type: "string",
      topics: TagsGenerator("" + desc + ""),
      visibility: "only_me",
      rating: rating,
    };
    if (check()) {
      PostAuthRequest("diary-entry/add/", body, successFxn, enqueueSnackbar, navigate, setLoading);
    } else {
      enqueueSnackbar("Url must start with https:// or http://", { variant: "error" });
    }
  };

  const shareHandler = () => {
    const successFxn = (res) => {
      console.log(res);
      const body = {
        message: "Diary entry shared as post.",
        "status code": 201,
        success: "True",
      };
      const success_share_Fxn = (res) => {
        enqueueSnackbar("Diary entry shared as post.", {
          variant: "success",
        });
        navigate("/success/dairy");
      };
      PostAuthRequest(
        `diary-entry/${res.data.data.id}/share-as-post`,
        body,
        success_share_Fxn,
        enqueueSnackbar,
        navigate,
        setLoading
      );
    };
    const body = {
      user: {
        username: user.user.username,
        bio: user.user.bio,
      },
      text: desc,
      url: url,
      resource_type: "string",
      topics: TagsGenerator(desc),
      visibility: "only_me",
      rating: rating,
    };
    if (check()) {
      PostAuthRequest("diary-entry/add/", body, successFxn, enqueueSnackbar, navigate, setLoading);
    } else {
      enqueueSnackbar("Url must start with https:// or http://", { variant: "error" });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <header className={styles.header}>
        <Navbar />
      </header>
      <div className={styles.mainContainer}>
        <div className={styles.input_div}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <h1 className={styles.label}>URL*</h1>
          </div>
          <input
            type="text"
            className={styles.input}
            placeholder="Paste your link here"
            defaultValue={copied}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles.input_div}>
          <h1 className={styles.label}>Add more details</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Add tags or description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className={styles.input_div}>
          <h1 className={styles.label}>Rating *</h1>
          <div className={styles.rating_bar}>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              className={styles.input_range}
              defaultValue="4"
              list="steplist"
              onChange={(e) => {
                setRating(e.currentTarget.value);
              }}
            />
            <datalist id="steplist">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </datalist>
            <div
              className={styles.side_label_bar}
              style={{
                backgroundColor: rating >= 4 ? "#CEFFD9" : rating >= 3 && rating < 4 ? "#FFFDCE" : "#FFD7CE",
              }}
            >
              <label
                className={styles.side_label}
                style={{
                  color: rating >= 4 ? "#1F4E0F" : rating >= 3 && rating < 4 ? "#875323" : "#4E130F",
                }}
              >
                {rating}
              </label>
              {/* <AiFillStar style={{ color: rating >= 4 ? "#1F4E0F" : rating >= 3 && rating < 4 ? "#875323" : "#4E130F" }} /> */}
            </div>
          </div>
        </div>

        <div className={styles.bottom_container}>
          <div className={styles.bottom_left}>
            {/* <img
              className={styles.icon}
              src={bookmark ? bookmark_saved_img : bookmark_img}
              onClick={() => setBookmark(!bookmark)}
            />
            <img className={styles.icon} src={tick ? tick_green_img : tick_img} onClick={() => setTick(!tick)} /> */}
          </div>
          <div className={styles.bottom_right}>
            {user && user.stateType == "dairy" && (
              <div className={styles.bottom_dairy}>
                <button
                  className={styles.add_btn}
                  onClick={() => {
                    check()
                      ? navigate("/ListPage", {
                          state: { url: url, rating: rating, tags: TagsGenerator("" + desc + ""), description: desc },
                        })
                      : enqueueSnackbar("Url must start with https:// or http://", { variant: "error" });
                  }}
                >
                  Add to List
                </button>
                <button className={styles.add_btn} onClick={() => submitHandler()}>
                  Add to Diary
                </button>
                <button className={styles.share_btn} onClick={() => shareHandler()}>
                  Add to Diary and Share as Post
                </button>
              </div>
            )}
            {user && user.stateType == "list" && (
              <div className={styles.bottom_dairy} style={{ justifyContent: "center" }}>
                <button
                  className={styles.add_btn}
                  onClick={() => {
                    check()
                      ? navigate("/ListPage", {
                          state: { url: url, rating: rating, tags: TagsGenerator("" + desc + ""), description: desc },
                        })
                      : enqueueSnackbar("Url must start with https:// or http://", { variant: "error" });
                  }}
                >
                  Add to List
                </button>

                <button className={styles.share_btn} onClick={() => shareHandler()}>
                  Add to Diary and Share as Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
