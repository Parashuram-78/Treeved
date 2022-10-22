import React from "react";
import styles from "./style.module.css";
const Loader_Small = () => {
  return (
    <div className={styles.main_container_small}>
      <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loader_Small;
