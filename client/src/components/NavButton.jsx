import React from "react";
import styles from "./NavButton.module.css";
import { Link } from 'react-router-dom';

function NavButton({ text, className, href, onClick, target }) {
    return (

        <Link className={styles.main} target={target} onClick={onClick} to={href} >
            {text}
        </Link>        
    );
}

export default NavButton;
