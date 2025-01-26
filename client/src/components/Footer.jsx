import React from "react";
import styles from "./Footer.module.scss";

import CompanyLogo from "../img/web-logo.png";
import SearchIcon from "../icons/search.svg";
import EyeIcon from "../icons/eye.svg";
import NavButton from "../components/NavButton";
import LinkGrey from "../components/LinkGrey";
import LinkDefault from "../components/LinkDefault";
import LinkFooter from "../components/LinkFooter";

function Footer({ className}) {
    return (
        <div className={styles.footer}>
        <div className={styles.footer__row}>
          <div className={styles.contact}>
            <div className={styles.contact__block1}>
              <h4 className={styles.contact__text}>Контакты</h4>
              <h5>620075 Центральный офис: г. Екатеринбург, ул. Карла Либкнехта, д. 22 , офис 302 (правое крыло)</h5>
              <h5>Многоканальный Телефон/Факс:+7 (343) 286-44-00</h5>
              <h5>Телефон горячей линии для граждан:+7 (343) 286-80-80</h5>              
              <div className={styles.link}>
              <h5 className={styles.link__spacing}>E-mail:</h5>
                    <a className={styles.link__main}  href={"https://u-rm.ru/karta-sayta"}> 
                        <div>                            
                            <h5  className={styles.link__text}>mail@u-rm.ru</h5>
                        </div> 
                    </a>
                </div>  
                <div className={styles.link}>
                    <div className={styles.link__allspacing}>
                        <a className={styles.link__main}  href={"https://u-rm.ru/o-kompanii/spisok-aktsionerov-strakhovoy-organizatsii-i-lits-pod-kontrolem-libo-znachitelnym-vliyaniem-kotorykh-nakhoditsya-strakhovaya-organizatsiya"}> 
                            <div>
                                <h5  className={styles.link__text}>Информация о лицах, под контролем либо значительным влиянием которых находится организация</h5>
                            </div> 
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.contact__block2}>
              <h4 className={styles.contact__text}>Документация</h4>              
                <LinkFooter text={'Политика конфиденциальности'} href={"https://u-rm.ru/policy"}/>  
                <LinkFooter text={'Условия использования'} href={"https://u-rm.ru/usloviya-ispolzovaniya"}/>
                <LinkFooter text={'Базовый стандарт защиты прав и интересов физических и юридических лиц - получателей финансовых услуг, оказываемых членами саморегулируемых организаций, объединяющих страховые организации  и иностранные страховые организации'} href={"https://u-rm.ru/uploads/document/001/fe94ced2031c7dbe225c52673d5fe16a70c18f3467d1a80fd962f7885ff6c60b/bazovyj-standart-zasity-prav-i-interesov-_kfnp-26-ot-26.08.2023_.pdf"}/>
            </div>
            <div className={styles.contact__block3}>
              <h4 className={styles.contact__text}>Информация</h4>              
                <LinkFooter text={'Карта сайта'} href={"https://u-rm.ru/karta-sayta"}/>
                <LinkFooter text={'Вакансии'} href={"https://u-rm.ru/vakansii"}/>      
            </div>
          </div>
          <div className={styles.copyright}>
            <div className={styles.copyright__block}>
                <h5>ООО Страховая медицинская компания «Урал-Рецепт М»</h5>
            </div>                   
          </div>
        </div>        
      </div>
    );
}

export default Footer;
