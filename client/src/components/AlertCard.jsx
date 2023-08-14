import React from "react";
import styles from "./AlertCard.module.scss";

function AlertCard({ key, createdate, title, text, className }) {
  return (
    <div>
      <div className={styles.alert}>
        {key}
        <div className={styles.alert__date}>{createdate}</div>
        <div className={styles.alert__title}>{title}</div>
        <div className={styles.alert__text}>{text}</div>
      </div>
    </div>
  );
}

// <a className={styles.main}onClick={onClick}>{text}</a>

export default AlertCard;
