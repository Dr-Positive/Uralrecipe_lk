import styles from "./SignPage.module.scss";
import CompanyLogo from "../img/web-logo.png";
import NavButton from "../components/NavButton";
import LinkGrey from "../components/LinkGrey";
import LinkDefault from "../components/LinkDefault";
import LinkFooter from "../components/LinkFooter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuestionGreen from "../icons/question.svg";
import QuestionBlack from "../icons/questionBlack.svg";
//import QuestionGreen from "../icons/questionGreen.svg";
import QuestionBlackSmall from "../icons/questionBlack.svg";
import QuestionGreenBig from "../icons/questionGreen.svg";
import { useContext, useState } from "react";
import { Context } from '../index.js';
import {observer} from "mobx-react-lite"
import {logining} from "../http/userAPI";
import { useNavigate, useLocation} from "react-router-dom"
import Button from "react-bootstrap/Button";
import { GUEST_ROUTE, ADMIN_ROUTE, MAIN_ROUTE } from '../utils/consts.js';

const SignPage = observer(( ) => {

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const click = async () => {
    try {
        const decodedToken = await logining(login, password);

        console.log('Роль пользователя:', decodedToken.role);

        user.setUser({
            id: decodedToken.id,
            role: decodedToken.role,
            compl: decodedToken.compl,
        });
        user.setIsAuth(true);

        if (decodedToken.role === 'ADMIN') {
            user.setIsAdmin(true);
            navigate(ADMIN_ROUTE);
        } else if (decodedToken.role === 'USER') {
            user.setIsAdmin(false);
            navigate(MAIN_ROUTE);
        } else {
            throw new Error('Неизвестная роль пользователя');
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error.message || error);
        alert(error.message || 'Ошибка авторизации');
    }
};

const loginClick = () => {
  alert("Подсказка: для ввода логина используете данные договора, если возникнут проблемы обращаетесь по номеру 8 (343) 286-80-80");
};
const passwordClick = () => {
  alert("Подсказка: для ввода ппроля используете данные договора, если возникнут проблемы обращаетесь по номеру 8 (343) 286-80-80");
};


  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <a className={styles.logo__link} href={"https:/https://u-rm.ru/"}>
            <img src={CompanyLogo} alt="logo" className={styles.logo__img} />
          </a>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.input}>
          <div className={styles.input__block}>
            <input  type="text" name="login" id="login" placeholder="Логин" className={styles.input__style} value={login} onChange={e => setLogin(e.target.value)} ></input>
            <img src={QuestionGreen} alt="questionsvg" className={styles.styleSvg} onClick={loginClick}/>
          </div>
          <div className={styles.input__block}>
            <input type="password" name="password" id="password" placeholder="Пароль" className={styles.input__style} value={password} onChange={e => setPassword(e.target.value)}></input>            
              <img src={QuestionGreen} alt="questionsvg" className={styles.styleSvg} onClick={passwordClick}/> 
          </div>
          <NavButton text={"Войти"} onClick={click} href={GUEST_ROUTE}></NavButton>   
          {/* href={GUEST_ROUTE} */}
        </div>
      </div>
      <Footer/>
    </div>
  );
})

export default SignPage;