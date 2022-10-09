import React from "react";
import styles from "./style.module.css";
const ListItem = ({ title, text, id, listId, setListId }) => {
  return (
    <>
      <div
        className={styles.item_main_container}
        onClick={() => {
          setListId(id);
        }}
        style={{ border: listId == id ? "1px solid blue" : "1px solid white" }}
      >
        <h1 className={styles.item_title}>{title}</h1>
        <p className={styles.item_text}>{text}</p>
      </div>
    </>
  );
};

export default ListItem;
