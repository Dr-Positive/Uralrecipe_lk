import React from "react";
import styles from "./LinkDefault.module.css";


function LinkDefault({ text, className, href, onClick, target }) {
    return (
        <div>
           <a className={styles.main} target={target} onClick={onClick} href={href}>{text}</a>
        </div>
    );
}

export default LinkDefault;
