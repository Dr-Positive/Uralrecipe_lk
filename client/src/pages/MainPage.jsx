import styles from "./MainPage.module.scss";
import NavButton from "../components/NavButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AlertCard from "../components/AlertCard";
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import {observer} from "mobx-react-lite"

const MainPage = observer(( ) => {

    const {alert} = useContext(Context)

    return (
      <div>
        <Header />
        <div className={styles.container}>
          <div className={styles.row}>
            <a className={styles.link__main} href={"https://u-rm.ru"}>            
              <h5 className={styles.link__text}>Главная страница</h5>            
            </a>
            <div className={styles.logo__img} />
            <p className={styles.text}>Личный кабинет</p>
          </div>
          <div className={styles.containerMain}>
            <div className={styles.containerMain__alert}>
              <div>
                {alert.alerts.map(type => 
                <AlertCard key={type.id} title={type.title} text={type.text} createdate={type.date}>                  

                </AlertCard>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  });

export default MainPage;
