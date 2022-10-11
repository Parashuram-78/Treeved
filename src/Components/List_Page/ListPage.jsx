import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import styles from "./style.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GetAuthRequest, PatchAuthRequest } from "../Helper/AuthRequest";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { getUser } from "../../features/User/UserSlice";
const ListPage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { url, rating } = location.state;
  const [list, setList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [listId, setListId] = useState();
  const user = useSelector(getUser);
  const pageId = user.pageId.toString();
  useEffect(() => {
    const successFxn = (res) => {
      console.log(res);
      setList(...list, res.data.results);
    };
    // page/"+{pageId}+"/list/all/?page=1
    GetAuthRequest(`page/${pageId}/list/all/?page=1`, successFxn, enqueueSnackbar, navigate);
  }, []);
  const submitHandler = () => {
    const successFxn = (res) => {
      const body = { rating: rating };
      const successFunction = (res) => {
        enqueueSnackbar("Sucessfully added to list", {
          variant: "success",
        });
      };
      PatchAuthRequest(`list/${listId}/add-to-list/` + res.data.content.id, body, successFunction, enqueueSnackbar, navigate);
    };
    GetAuthRequest("resource/search/url?q=" + url, successFxn, enqueueSnackbar, navigate);
  };
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.navbar_container}>
          <BsArrowLeftShort
            fontSize="30px"
            cursor="pointer"
            onClick={() => {
              navigate("/home");
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
