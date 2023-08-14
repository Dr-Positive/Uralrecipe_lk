// LinkFooter


import React from "react";
import styles from "./LinkFooter.module.css";


function LinkFooter({ text, className, href, onClick, target }) {
    return (
        <div>
           <a className={styles.main} target={target} onClick={onClick} href={href}>{text}</a>
        </div>
    );
}

export default LinkFooter;
