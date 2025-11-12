import styles from "./ForgotPasswordPage.module.scss";
import CompanyLogo from "../img/web-logo.png";
import NavButton from "../components/NavButton.jsx";
import LinkGrey from "../components/LinkGrey.jsx";
import LinkDefault from "../components/LinkDefault.jsx";
import LinkFooter from "../components/LinkFooter.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import QuestionGreen from "../icons/question.svg";
import QuestionBlack from "../icons/questionBlack.svg";
//import QuestionGreen from "../icons/questionGreen.svg";
import QuestionBlackSmall from "../icons/questionBlack.svg";
import QuestionGreenBig from "../icons/questionGreen.svg";
import { useContext, useState } from "react";
import { Context } from '../index.js';
import { observer } from "mobx-react-lite"
import { forgotPassword } from "../http/authApi.js";
import { useNavigate, useLocation, NavLink } from "react-router-dom"
import Button from "react-bootstrap/Button";
import { GUEST_ROUTE, ADMIN_ROUTE, MAIN_ROUTE, PASSWORD_ROUTE } from '../utils/consts.js';
import NavMainButton from "../components/NavMainButton.jsx";
import Modal from 'react-bootstrap/Modal';
import React from "react";
import { Alert } from "react-bootstrap";

const forgotPasswordPage = observer(() => {

  const { user } = useContext(Context);
  const navigate = useNavigate();


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [polis, setPolis] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const [showChange, setShowChange] = useState(false);

  const handleCloseChange = () => setShowChange(false);

    const [errorMessage, setErrorMessage] = useState("");  // ✅


  const handlePasswordChange = async () => {
    // Здесь должен быть ваш API-запрос для смены пароля
    console.log("Старый пароль:", oldPassword);
    console.log("Новый пароль:", newPassword);
    alert("Пароль успешно изменён");
    setShowChange(false);
    setOldPassword('');
    setNewPassword('');
  };

   const clickForgot = async () => {
    setErrorMessage("");  // очищаем ошибку
    try {
      const result = await forgotPassword(login, tel);
      setIsSuccess(true);
      // можно также сбросить поля
      setLogin("");
      setEmail("");
      setTel("");
    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Ошибка при отправке письма";
      setErrorMessage(msg);
      console.error("Ошибка при восстановлении пароля:", msg);
    }
  };



  const [isSuccess, setIsSuccess] = React.useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <a className={styles.logo__link} href={MAIN_ROUTE}>
            <img src={CompanyLogo} alt="logo" className={styles.logo__img} />
          </a>
        </div>
      </div>
      {!isSuccess && (
        <div className={styles.container}>
          <div className={styles.input}>
            <h1>Восстановить пароль</h1>
            <p>Введите логин пользователя</p>
            <div className={styles.input__block}>
              <input type="text" name="login" id="login" placeholder="Логин " className={styles.input__style} value={login} onChange={e => setLogin(e.target.value)}  ></input>

            </div>
            <p>Введите почту для восстановления пароля</p>
            <div className={styles.input__block}>
              <input type="email" name="email" id="email" placeholder="Почта" className={styles.input__style} value={email} onChange={e => setEmail(e.target.value)}></input>
            </div>
            <p>Введите номер телефона</p>
            <div className={styles.input__block}>
              <input type="tel" name="tel" id="tel" placeholder="Телефон" className={styles.input__style} value={tel} onChange={e => setTel(e.target.value)}></input>
            </div>
            {/* <p>Введите номер полиса</p>
                <div className={styles.input__block}>
                  <input type="text" name="polis" id="polis" placeholder="Полис" className={styles.input__style} value={polis} onChange={e => setPolis(e.target.value)}></input>
                </div> */}
            {/* <NavButton text={"Отправить"} onClick={click} ></NavButton> */}
            {/* ✅ Alert для ошибок */}
            {errorMessage && (
              <Alert variant="danger" className="mt-3">
                {errorMessage}
              </Alert>
            )}
            <Button variant="success" onClick={clickForgot}>Отправить</Button>
            {/* clickForgot handleShow */}
            {/* href={GUEST_ROUTE} */}

          </div>
        </div>
      )}
      {isSuccess && (
        <div className={styles.container}>
          <div className={styles.input}>
            <h1>Инструкция по сбросу успешно отправлена. В случае отсутствия письма рекомендуем проверить спам.</h1>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
})

export default forgotPasswordPage;