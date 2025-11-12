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
import { useNavigate, useLocation, NavLink, useSearchParams } from "react-router-dom"
import { resetPassword, verifyToken } from "../http/authApi.js";
import Button from "react-bootstrap/Button";
import { GUEST_ROUTE, ADMIN_ROUTE, MAIN_ROUTE, PASSWORD_ROUTE } from '../utils/consts.js';
import NavMainButton from "../components/NavMainButton";
import Modal from 'react-bootstrap/Modal';
import React from "react";
import EyeOpen from "../icons/eye_gray.svg";
import EyeClosed from "../icons/eye-slash_gray.svg";

const PasswordPage = observer(() => {


  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [polis, setPolis] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [showChange, setShowChange] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleCloseChange = () => setShowChange(false);

  const handlePasswordChange = async () => {

    console.log("Токен для сброса:", resetToken);

    const isResetDone = await resetPassword(resetToken, password);

    console.log("TOKEN:", resetToken);
    console.log("PASSWORD:", password);

    if (isResetDone) {
      setIsResetSuccess(true);
    } else {
      setIsResetSuccess(false);
    }



    // Здесь должен быть ваш API-запрос для смены пароля
    console.log("Старый пароль:", oldPassword);
    console.log("Новый пароль:", newPassword);
    alert("Пароль успешно изменён");
    setShowChange(false);
    setOldPassword('');
    setNewPassword('');
  };



  const [tokenVerified, setTokenVerified] = React.useState(false)
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("resetToken");
      if (token) {
        setResetToken(token);
        setTokenVerified(await verifyToken(token));
      } else {
        setTokenVerified(false);
      }
    };
    verify();
  }, [searchParams]);


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
          <a className={styles.logo__link} href={MAIN_ROUTE}>
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
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    className={styles.input__style}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={showPassword ? EyeOpen : EyeClosed}
                    alt="show_password"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
              </div>
              {/* <p>Подтвердите пароль</p>
              <div className={styles.input__block}>
                <input type="password" name="password" id="password" placeholder="password" className={styles.input__style} value={password} onChange={e => setPassword(e.target.value)}></input>
              </div> */}
              <Button variant="success" onClick={handlePasswordChange} href={MAIN_ROUTE}>Отправить</Button>
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