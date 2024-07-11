import styles from "./SignPage.module.scss";
import CompanyLogo from "../img/web-logo.png";
import NavButton from "../components/NavButton";
import LinkGrey from "../components/LinkGrey";
import LinkDefault from "../components/LinkDefault";
import LinkFooter from "../components/LinkFooter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuestionSvg from "../icons/question.svg";
import QuestionBlack from "../icons/questionBlack.svg";
import QuestionGreen from "../icons/questionGreen.svg";
import QuestionBlackSmall from "../icons/questionBlack.svg";
import QuestionGreenBig from "../icons/questionGreen.svg";
import { LK_ROUTE,LOGIN_ROUTE } from "../utils/consts";
import { useContext, useState } from "react";
import { Context } from '../index.js';
import {observer} from "mobx-react-lite"
import { login} from "../http/userAPI.js";
import { useNavigate, useLocation} from "react-router-dom"

const SignPage = observer(( ) => {

  const handleClick = () => {
    console.log('подсказываю')
  };

  const {user} = useContext(Context)
  



   const location = useLocation()
   const history = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE



  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
        let data;
        if (isLogin) {
            data = await login(login, password);
        }
        user.setIsAuth(true)
        history.push(LK_ROUTE)
    } catch (e) {
        alert(e.response.data.message)
    }

}

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
            <img src={QuestionGreen} alt="questionsvg" className={styles.styleSvg} onClick={handleClick}/>
          </div>
          <div className={styles.input__block}>
            <input type="password" name="password" id="password" placeholder="Пароль" className={styles.input__style} value={password} onChange={e => setPassword(e.target.value)}></input>            
              <img src={QuestionGreen} alt="questionsvg" className={styles.styleSvg} onClick={handleClick}/>
          </div>       
          <NavButton text={"Войти"} href={LK_ROUTE} onClick={(click) => user.setIsAuth(true)}></NavButton>   
          {/* onClick={(click) => user.setIsAuth(true)}     */}
        </div>
      </div>
      <Footer/>
    </div>
  );
})

export default SignPage;
