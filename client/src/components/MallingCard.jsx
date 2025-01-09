import React from "react";
import styles from "./MailingCard.module.scss";


const MailingCard = ({mailing}) => {

  
  return (
    <div>
      <div className={styles.mailing}>
        <div className={styles.mailing__date}>{mailing.date}</div>
        <div className={styles.mailing__title}>{mailing.title}</div>
        <div className={styles.mailing__text}>{mailing.text}</div>

      </div>
    </div>
  );
}

// <a className={styles.main}onClick={onClick}>{text}</a>

export default MailingCard;