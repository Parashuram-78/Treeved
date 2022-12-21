import React, { useState, useEffect, useRef, useCallback } from "react";
import ListItem from "./ListItem";
import styles from "./style.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GetAuthRequest, PatchAuthRequest } from "../Helper/AuthRequest";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { getUser } from "../../features/User/UserSlice";
import Loader from "../Loader/Loader";
const ListPage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { url, rating, tags, description } = location.state;
  const [list, setList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [listId, setListId] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector(getUser);
  const pageId = user.pageId;
  const userName = user.userName;
  const [pageNumber, setPageNumber] = useState(1);
  const loader = useRef();
  const [hasMore, setHasMore] = useState(true);

  const getLists = () => {
    if (user.stateType === "list") {
      const successFxn = (res) => {
        console.log(res);
        setList(list.concat(res.data.results));
        if (res.data.next === null) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      };
      GetAuthRequest(`page/${pageId}/list/all/?page=${pageNumber}`, successFxn, enqueueSnackbar, navigate, setLoading);
    } else if (user.stateType === "dairy") {
      const successFxn = (res) => {
        console.log(res);
        setList(list.concat(res.data.results));

        if (res.data.links.next === null) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      };

      GetAuthRequest(`list/${userName}/user-collection-lists?page=${pageNumber}`, successFxn, enqueueSnackbar, navigate, setLoading);
    }
  };

  useEffect(() => {
    getLists();
  }, [pageNumber]);

  const submitHandler = () => {
    const successFxn = (res) => {
      const body = { rating: rating };
      const successFunction = (res) => {
        enqueueSnackbar("Sucessfully added to list", {
          variant: "success",
        });
        navigate("/success/list");
      };
      PatchAuthRequest(
        `list/${listId}/add-to-list/` + res.data.content.id,
        body,
        successFunction,
        enqueueSnackbar,
        navigate,
        setLoading
      );
    };
    GetAuthRequest("resource/search/url?q=" + url, successFxn, enqueueSnackbar, navigate, setLoading);
  };

  const handleObserver = useCallback((entries) => {
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

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
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
          <p className={styles.nav_text}>Select list</p>
        </div>
        <div className={styles.list_container}>
          {list.length !== 0 &&
            list.map((listItem, index) => {
              return (
                <ListItem
                  key={listItem.id}
                  title={listItem.name}
                  text={listItem.description}
                  id={listItem.id}
                  listId={listId}
                  setListId={setListId}
                />
              );
            })}
          {list.length === 0 && <h5>No list available for this page</h5>}
          <div ref={loader} />
        </div>
        {list.length !== 0 && (
          <div className={styles.bottom_container}>
            <button
              className={styles.add_btn}
              onClick={() => {
                submitHandler();
              }}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListPage;
