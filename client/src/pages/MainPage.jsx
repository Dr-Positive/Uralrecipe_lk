import styles from "./MainPage.module.scss";
import NavButton from "../components/NavButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import { fetchAlerts } from "../http/alertAPI";
import { fetchMailings } from "../http/mailingAPI";
import AlertList from "../components/AlertList";
import MallingList from "../components/MallingList";

const MainPage = observer(() => { 
  const { mailing ,alert, user } = useContext(Context);


  console.log("isAuth:", user.isAuth);
  console.log("isAdmin:", user.isAdmin);

  useEffect(() => {
    async function fetchData() {
      try {
        const alertsData = await fetchAlerts();
        alert.setAlerts(alertsData);
        
        const mailingsData = await fetchMailings();
        mailing.setMailings(mailingsData); // Убедитесь, что данные о рассылках сохраняются в состоянии.
        
        console.log('Alerts in AlertStore:', alert.alerts);
        console.log('Mailings in MailingStore:', mailing.mailings);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      }
    }

    fetchData();
  }, [alert,mailing]);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.row}>
          <a className={styles.link__main} href={"https://https://u-rm.ru/"}>            
            <h5 className={styles.link__text}>Главная страница</h5>            
          </a>
          <div className={styles.logo__img} />
          <a className={styles.text}>Личный кабинет</a>
        </div>

        <div className={styles.containerMain}>
          <div className={styles.containerMain__alert}>
            <div>
              {user.isAuth && !user.isAdmin &&(
                <AlertList />
             )}
              {user.isAdmin && user.isAuth && (
                <MallingList />
             )}
            </div>
            <div>
            {user.isAdmin && <p>Вы администратор</p>}
        </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
});

export default MainPage;
