import React, { useEffect, useState, useRef, useCallback } from "react";
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
import Loader from "../Loader/Loader";
const Userpage = () => {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [url, setUrl] = useState("");
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const loader = useRef();
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const successFxn = (res) => {
      dispatch(setUser(res.data));
      dispatch(setCurrentState("dairy"));
      dispatch(setCurrentStateUserName(res.data.username));
      dispatch(setCurrentStateProfileImage(res.data.profile_picture));
    };
    if (user && user.user && user.userName && user.profileImage) {
    } else {
      GetAuthRequest("users/me/", successFxn, enqueueSnackbar, navigate, setLoading);
    }
    console.log(user);
  }, []);
  useEffect(() => {
    const successFxn = (res) => {
      console.log(res)
      setPages([...pages, ...res.data.results]);
      if (res.data.next !== null) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    };
    GetAuthRequest(`page/mypages/?page=${pageNumber}`, successFxn, enqueueSnackbar, navigate, setLoading);
    // console.log(pages);
  }, [pageNumber]);

  const handleObserver = useCallback((entries) => {
    if (loading) return;

    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      setPageNumber((prev) => prev + 0.5);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    if (loading) {
      return;
    }
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current && !loading) observer.observe(loader.current);
  }, [handleObserver]);
  return (
    <>
      {loading && <Loader />}
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
          <UserPageItem
            title={user && user.user ? user.user.username : "UserName"}
            type="dairy"
            profileImage={user && user.user ? user.user.profile_picture : "UserName"}
          />
          {pages.map((page, index) => {
            return (
              <UserPageItem key={page.id} title={page.name} type="list" profileImage={page.cover_picture} pageId={page.id} />
            );
          })}
          <div ref={loader} />
        </div>
      </div>
    </>
  );
};

export default Userpage;
