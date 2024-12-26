import React from "react";
import styles from "./LinkDefault.module.css";
import { Link } from 'react-router-dom';

function LinkDefault({ text, className, href, onClick, target }) {
    return (
        // <div>
        //    <a className={styles.main} target={target} onClick={onClick} to={href}>{text}</a>
        // </div>
        <Link to={href} className={styles.main} target={target} onClick={onClick}>
            {text}
        </Link>
    );
}

export default LinkDefault;
