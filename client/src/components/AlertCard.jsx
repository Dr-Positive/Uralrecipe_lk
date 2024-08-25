import React from "react";
import styles from "./AlertCard.module.scss";


const AlertCard = ({alert}) => {
  return (
    <div>
      <div className={styles.alert}>
        <div className={styles.alert__date}>{alert.date}</div>
        <div className={styles.alert__title}>{alert.title}</div>
        <div className={styles.alert__text}>{alert.text}</div>
        <div className={styles.alert__text}>{alert.mounth}</div>
      </div>
    </div>
  );
}

// <a className={styles.main}onClick={onClick}>{text}</a>

export default AlertCard;
