import React from "react";
import styles from "./style.module.css";
import list from "../../Images/list.svg";
import { useNavigate } from "react-router-dom";

const List_Success = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.navbar_container}></div>
        <div className={styles.main}>
          <div className={styles.top_container}>
            <img className={styles.image} src={list} />
          </div>
          <div className={styles.middle_container}>
            <h1 className={styles.text}>Added to list</h1>
            <p className={styles.sub_text}>Your link was saved to the list</p>
          </div>
          <div className={styles.bottom_container}>
            {/* <button className={styles.close_btn}>Close</button> */}
            <button className={styles.home_btn} onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default List_Success;
