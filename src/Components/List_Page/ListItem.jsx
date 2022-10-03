import React from "react";
import styles from "./style.module.css";
const ListItem = ({ title, text }) => {
  return (
    <>
      <div className={styles.item_main_container}>
        <h1 className={styles.item_title}>{title}</h1>
        <p className={styles.item_text}>{text}</p>
      </div>
    </>
  );
};

export default ListItem;
