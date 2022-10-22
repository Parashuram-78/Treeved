import React from "react";
import styles from "./style.module.css";
const Loader = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loader;
