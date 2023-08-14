import React from "react";
import styles from "./NavButton.module.css";


function NavButton({ text, className, href, onClick, target }) {
    return (
        <div>
           <a className={styles.main} target={target} onClick={onClick} href={href}>{text}</a>
        </div>
    );
}

export default NavButton;
