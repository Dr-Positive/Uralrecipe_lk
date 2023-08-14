import React from "react";
import styles from "./LinkGrey.module.css";


function LinkGrey({ text, className, href, onClick, target }) {
    return (
        <div>
           <a className={styles.main} target={target} onClick={onClick} href={href}>{text}</a>
        </div>
    );
}

export default LinkGrey;
