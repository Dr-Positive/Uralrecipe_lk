import React from "react";
import styles from "./Header.module.scss";

import CompanyLogo from "../img/web-logo.png";
import SearchIcon from "../icons/search.svg";
import EyeIcon from "../icons/eye.svg";
import NavButton from "../components/NavButton";
import LinkGrey from "../components/LinkGrey";
import LinkDefault from "../components/LinkDefault";
import LinkFooter from "../components/LinkFooter";
import { useContext } from 'react';
import { Context } from '../index.js'
import { ADMIN_ROUTE, MAIN_ROUTE, GUEST_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite"

const Header = observer(() => {

  const { user } = useContext(Context)

  console.log('isAuth:', user.isAuth);
  console.log('isAdmin:', user.isAdmin);


  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    user.setIsAdmin(false)
    localStorage.clear();
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <a className={styles.logo__link} href={"https:/https://u-rm.ru/"}>
          <img src={CompanyLogo} alt="logo" className={styles.logo__img} />
        </a>
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.rightBlock__content}>
          <div className={styles.rightBlock}>
            {user.isAdmin && user.isAuth && (
              <div className={styles.adminbtn}>
                <LinkDefault text={'Админ панель'} href={ADMIN_ROUTE} />
              </div>
            )}
            {user.isAuth && (
              <div className={styles.adminbtn}>
                <LinkDefault text={'Личный кабинет'} href={MAIN_ROUTE} />
              </div>
            )}
            <div className={styles.adminbtn}>
              <LinkDefault text={'Информационный сайт'} href={"https:/https://u-rm.ru/"}/>
            </div>
            <div className={styles.adminbtn}>
              <LinkDefault text={'Выход'} onClick={() => logOut()} href={GUEST_ROUTE} />
            </div>
            <p className={styles.rightBlock__text}>ГОРЯЧАЯ ЛИНИЯ:</p>
            <LinkDefault text={'8 (343) 286-80-80'} />
          </div>
        </div>
      </div>
    </div >
  );
});

export default Header;

{/* {user.isAuth && ( */ }