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
import { LK_ROUTE} from "../utils/consts";
import { useContext, useState } from "react";
import { Context } from '../index.js';
import {observer} from "mobx-react-lite"
import {logining} from "../http/userAPI";
import { useNavigate, useLocation} from "react-router-dom"
import Button from "react-bootstrap/Button";
import { useUserChecked } from "../hooks/useUserChecked.js";


const SignPage = observer(( ) => {

  const { user } = useContext(Context);
  const { setUserChecked } = useUserChecked();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const click = async () => {
    try {

      const decodedToken = await logining(login, password);

      console.log('Роль пользователя:', decodedToken.role);

      // Сохраняем пользователя в UserStore
      user.setUser({
          id: decodedToken.id,
          role: decodedToken.role,
          compl: decodedToken.compl,
      });
      user.setIsAuth(true);
      setUserChecked(true);

      if (decodedToken.role === 'ADMIN') {
          user.setIsAdmin(true);
      }

      //history.push(LK_ROUTE);
  } catch (error) {
      console.error('Ошибка при авторизации:', error.message || error);
      alert(error.message || 'Ошибка авторизации');
  }
};

const loginClick = () => {
  alert("Подсказка: для ввода логина используете данные ..., если возникнут проблемы обращаетесь по номеру");
};
const passwordClick = () => {
  alert("Подсказка: для ввода ппроля используете данные ..., если возникнут проблемы обращаетесь по номеру");
};


  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <a className={styles.logo__link} href={"https://u-rm.ru/"}>
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
          <NavButton text={"Войти"} onClick={click} href={LK_ROUTE}></NavButton>   
          {/* href={LK_ROUTE} */}
        </div>
      </div>
      <Footer/>
    </div>
  );
})

export default SignPage;