import React from "react";
import ListItem from "./ListItem";
import styles from "./style.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const ListPage = () => {
  let navigate = useNavigate();

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
          <ListItem
            title="Money and Economics"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur sociis."
          />
          <ListItem
            title="Money and Economics"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur sociis."
          />
          <ListItem
            title="Money and Economics"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur sociis."
          />
          <ListItem
            title="Money and Economics"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur sociis."
          />
          <ListItem
            title="Money and Economics"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse consectetur sociis."
          />
        </div>
        <div className={styles.bottom_container}>
          <button className={styles.add_btn}>Add</button>
        </div>
      </div>
    </>
  );
};

export default ListPage;
