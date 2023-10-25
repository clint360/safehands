import React from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  size: number;
}

const Loader = ({ size }: LoaderProps) => {
  const loaderStyle = {
    width: size,
    height: size,
  };

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} style={loaderStyle}>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default Loader;
