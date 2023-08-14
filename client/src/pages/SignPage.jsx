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
import { LK_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { Context } from '../index.js';
import {observer} from "mobx-react-lite"

const SignPage = observer(( ) => {

  const handleClick = () => {
    console.log('подсказываю')
  };

  const {user} = useContext(Context)

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
            <input  type="text" name="login" id="login" placeholder="Логин" className={styles.input__style} ></input>
            <img src={QuestionGreen} alt="questionsvg" className={styles.styleSvg} onClick={handleClick}/>
          </div>
          <div className={styles.input__block}>
            <input type="password" name="password" id="password" placeholder="Пароль" className={styles.input__style}></input>            
              <img src={QuestionGreen} alt="questionsvg" className={styles.styleSvg} onClick={handleClick}/>
          </div>       
          <NavButton text={"Войти"} href={LK_ROUTE} onClick={() => user.setIsAuth(true)}></NavButton>       
        </div>
      </div>
      <Footer/>
    </div>
  );
})

export default SignPage;
