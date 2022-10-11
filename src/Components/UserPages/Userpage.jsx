import React, { useEffect, useState } from "react";
import UserPageItem from "./UserPageItem";
import styles from "./style.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { GetAuthRequest } from "../Helper/AuthRequest";
import {
  getUser,
  setUser,
  setCurrentState,
  setCurrentStateUserName,
  setCurrentStateProfileImage,
} from "../../features/User/UserSlice";
const Userpage = () => {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [url, setUrl] = useState("");
  const [pages, setPages] = useState([]);
  useEffect(() => {
    const successFxn = (res) => {
      dispatch(setUser(res.data));
      dispatch(setCurrentState("dairy"));
      dispatch(setCurrentStateUserName(res.data.username));
      dispatch(setCurrentStateProfileImage(res.data.profile_picture));
    };
    if (user && user.user && user.userName && user.profileImage) {
    } else {
      GetAuthRequest("users/me/", successFxn, enqueueSnackbar, navigate);
    }
    console.log(user);
  }, []);
  useEffect(() => {
    const successFxn = (res) => {
      setPages(...pages, res.data.results);
    };
    GetAuthRequest("page/mypages/?page=1", successFxn, enqueueSnackbar, navigate);
    console.log(pages);
  }, []);
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.navbar_container}>
          <BsArrowLeftShort
            fontSize="30px"
            cursor="pointer"
            onClick={() => {
              navigate("/");
            }}
          />
          <p className={styles.nav_text}>Select Pages</p>
        </div>
        <div className={styles.list_container}>
          <UserPageItem title={user && user.user ? user.user.username : "UserName"} type="dairy" profileImage={user && user.user ? user.user.profile_picture : "UserName"} />
          {pages.map((page, index) => {
            return <UserPageItem key={page.id} title={page.name} type="list" profileImage={page.cover_picture}  pageId={page.id}/>;
          })}
        </div>
      </div>
    </>
  );
};

export default Userpage;
