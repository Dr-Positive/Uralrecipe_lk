import styles from "./PasswordPage.module.scss";
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
import { observer } from "mobx-react-lite"
import { logining } from "../http/userAPI";
import { verifyToken } from "../http/authApi";
import { useNavigate, useLocation, NavLink, useSearchParams } from "react-router-dom"
import Button from "react-bootstrap/Button";
import { GUEST_ROUTE, ADMIN_ROUTE, MAIN_ROUTE, PASSWORD_ROUTE } from '../utils/consts.js';
import NavMainButton from "../components/NavMainButton";
import Modal from 'react-bootstrap/Modal';
import React from "react";
const PasswordPage = observer(() => {

  const [tokenVerified, setTokenVerified] = React.useState(false)



  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("resetToken");
      if (token) {
        setTokenVerified(await verifyToken(token));
      } else {
        setTokenVerified(false)
      }
    };
    verify();
  }, [searchParams]);

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

  const handlePasswordChange = async () => {
    // Здесь должен быть ваш API-запрос для смены пароля
    console.log("Старый пароль:", oldPassword);
    console.log("Новый пароль:", newPassword);
    alert("Пароль успешно изменён");
    setShowChange(false);
    setOldPassword('');
    setNewPassword('');
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOpenConfirm = () => setShowConfirm(true);

  const click = async () => {
    try {
      const decodedToken = await logining(login, email, tel, polis);

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
    alert("Подсказка: для ввода логина используете номер договора, если возникнут проблемы обращаетесь по номеру 8 (343) 286-80-80");
  };
  const passwordClick = () => {
    alert("Подсказка: для ввода пароля используете данные договора, если возникнут проблемы обращаетесь по номеру 8 (343) 286-80-80");
  };


  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <a className={styles.logo__link} >
            <img src={CompanyLogo} alt="logo" className={styles.logo__img} />
          </a>
        </div>
      </div>
      <div className={styles.container}>
        {tokenVerified ? (
          <>
            <div className={styles.input}>
              <h1>Сброс пароля</h1>
              <p>Введите пароль</p>
              <div className={styles.input__block}>
                <input type="password" name="password" id="password" placeholder="password" className={styles.input__style} value={newPassword} onChange={e => setNewPassword(e.target.value)}></input>
              </div>
              <Button variant="success" onClick={handleShow}>Отправить</Button>
            </div>
          </>

        ) : (
          <p>Invalid Token</p>
        )}

      </div>
      <Footer />
    </div>
  );
})

export default PasswordPage;