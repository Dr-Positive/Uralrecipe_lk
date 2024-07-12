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
import { ADMIN_ROUTE } from "../utils/consts"; 
import { LOGIN_ROUTE } from "../utils/consts"; 
import { LK_ROUTE } from "../utils/consts"; 
import {observer} from "mobx-react-lite"

const Header = observer(( ) => {

  const {user} = useContext(Context)
  
  
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
}

    return (
        <div className={styles.header}>
        <div className={styles.logo}>
          <a className={styles.logo__link} href={"https://u-rm.ru/"}>
            <img src={CompanyLogo} alt="logo" className={styles.logo__img}/>
          </a>
        </div>
        <div className={styles.menu}>
          <div className={styles.menu__top}>
            <ul className={styles.toplist}>
              <li className={styles.toplist__indent}>
                <LinkGrey  text={'ОМС'} href="https://u-rm.ru/oms"/>
              </li>
              <li className={styles.toplist__indent}>
                <LinkGrey text={'Полис ОМС '} href="https://u-rm.ru/polis-oms"/>
              </li>
              <li className={styles.toplist__indent}>
                <LinkGrey text={'Защита прав застрахованных'} href="https://u-rm.ru/zaschita-prav-zastrakhovannykh"/>
              </li>
              <li className={styles.toplist__indent}>
                <LinkGrey text={'Программа ОМС'} href="https://u-rm.ru/programma-oms"/>
              </li>
              <li className={styles.toplist__indent}>
                <LinkGrey text={'Диспансеризация'} href="https://u-rm.ru/dispanserizatsiya"/>
              </li>
              <li className={styles.toplist__indent}>
                <LinkGrey text={'Страховые представители '}  href="https://u-rm.ru/strakhovye-predstaviteli"/>
              </li>
              <li className={styles.toplist__indent}>
                <LinkGrey text={'Углубленная диспансеризация'}  href="https://u-rm.ru/uglublennaya-dispanserizatsiya"/>
              </li>
              <li className={styles.toplist__indent}>
                <LinkGrey text={'Вакцинация'} href="https://profilaktica.ru/for-population/vakcinaciya/"/>
              </li>
              <li className={styles.toplist__indent}>
                <LinkGrey text={'Инфографика'} href="https://u-rm.ru/infografika"/>
              </li>
            </ul>
            <div className={styles.eye}>
              <div className={styles.search}>
              <LinkDefault text={'Выход'} onClick={() => logOut()} href={LOGIN_ROUTE}/>
              </div>              
            </div>            
            <div className={styles.eye}>
              <div className={styles.search}>
                <a className={styles.search__link} text={'Омс'} href={"https://u-rm.ru/search"}>
                  <img
                    src={SearchIcon}
                    alt="searchIcon"
                    className={styles.search__icon}
                  />
                </a>
              </div>
              <a className={`${styles.eye__link} ${styles.disabled}`} href={"https://u-rm.ru/"}>
                <img
                  src={EyeIcon}
                  alt="EyeIcon"
                  className={styles.eye__icon}
                />
              </a>
              <p className={`${styles.eye__text} ${styles.disabled}`} >Версия для слабовидящих</p>
              </div>              
            </div>
          <div className={styles.menu__bottom}>
            <div>
              <ul className={styles.bottomlist}>
                <li className={styles.bottomlist__indent} >
                  <LinkDefault text={'О компании'} href="https://u-rm.ru/o-kompanii"/>
                </li>
                <li className={styles.bottomlist__indent}>
                  <LinkDefault text={'Нормативные документы'} href="https://u-rm.ru/normativnye-dokumenty"/>
                </li>
                <li className={styles.bottomlist__indent}>
                  <LinkDefault text={'Написать'} href="https://u-rm.ru/napisat"/>
                </li>
                <li className={styles.bottomlist__indent}>
                  <LinkDefault text={'Новости'} href="https://u-rm.ru/novosti"/>
                </li>
                <li className={styles.bottomlist__indent}>
                  <LinkDefault text={'Контакты'} href="https://u-rm.ru/kontakty"/>
                </li>
              </ul>
            </div>
            <div className={styles.rightBlock}>
            {user.isAuth && (                    
              <div className={styles.adminbtn}>
                <LinkDefault text={'Админ панель'} href={ADMIN_ROUTE}/>               
              </div>
             )}
              <div className={styles.lkbtn}>
                <LinkDefault text={'Личный кабинет'} href={LK_ROUTE}/>               
              </div>
              <p className={styles.rightBlock__text}>ГОРЯЧАЯ ЛИНИЯ:</p>
              <LinkDefault text={'8 (343) 286-80-80'}/>           
            </div>
          </div>
        </div>
      </div>
    );
});

export default Header;
