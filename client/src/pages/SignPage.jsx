import styles from "./SignPage.module.scss";
import CompanyLogo from "../img/web-logo.png";
import NavButton from "../components/NavButton";
import LinkGrey from "../components/LinkGrey";
import Footer from "../components/Footer";
import QuestionGreen from "../icons/question.svg";
import EyeOpen from "../icons/eye_gray.svg";
import EyeClosed from "../icons/eye-slash_gray.svg";
import { useContext, useState } from "react";
import { Context } from '../index.js';
import { observer } from "mobx-react-lite";
import { logining } from "../http/userAPI";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, MAIN_ROUTE, FORGOTE_ROUTE } from '../utils/consts.js';
import Alert from 'react-bootstrap/Alert';

const SignPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  const click = async () => {
    if (lockoutTime > Date.now()) {
      setErrorMessage(`Попробуйте снова через ${Math.ceil((lockoutTime - Date.now()) / 1000)} секунд.`);
      return;
    }

    setErrorMessage("");
    setLoading(true);
    try {
      const decodedToken = await logining(login, password);

      user.setUser({
        id: decodedToken.id,
        login: decodedToken.login,
        email: decodedToken.email,
        tel: decodedToken.tel,
        compl: decodedToken.compl,
        role: decodedToken.role
      });
      user.setIsAuth(true);
      user.setIsAdmin(decodedToken.role === "ADMIN");

      navigate(decodedToken.role === "ADMIN" ? ADMIN_ROUTE : MAIN_ROUTE);
      setFailedAttempts(0);
      setLockoutTime(0);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Ошибка авторизации";
      setErrorMessage(msg);
      console.error(msg);

      setFailedAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= 3) {
          const delay = Math.pow(2, newAttempts - 2) * 15 * 1000; // Прогрессирующая задержка: 15, 30, 60 секунд и т.д.
          setLockoutTime(Date.now() + delay);
        }
        return newAttempts;
      });
    } finally {
      setLoading(false);
    }
  };

  const loginClick = () => {
    alert("Подсказка: для ввода логина используете номер договора. \nПри проблемах звоните: 8 (343) 286-80-80");
  };
  const passwordClick = () => {
    alert("Подсказка: пароль указан в договоре. \nПри проблемах звоните: 8 (343) 286-80-80");
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <a href={MAIN_ROUTE}>
            <img src={CompanyLogo} alt="logo" className={styles.logo__img} />
          </a>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.input}>
          <div className={styles.input__block}>
            <input
              type="text"
              placeholder="Логин"
              className={styles.input__style}
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                setErrorMessage("");
              }}
            />
            <img
              src={QuestionGreen}
              alt="question"
              className={styles.styleSvg}
              onClick={loginClick}
            />
          </div>

          <div className={styles.input__block}>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                className={styles.input__style}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
              <img
                src={showPassword ? EyeOpen : EyeClosed}
                alt="show_password"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>

            <img
              src={QuestionGreen}
              alt="question"
              className={styles.styleSvg}
              onClick={passwordClick}
            />
          </div>
          {errorMessage && (
            <Alert variant="danger" className={`${styles.alertSmall} mt-3 text-center`}>
              {errorMessage}
            </Alert>
          )}

          {lockoutTime > Date.now() && (
            <Alert variant="warning" className={`${styles.alertSmall} mt-3 text-center`}>
              Ваш аккаунт заблокирован на {Math.ceil((lockoutTime - Date.now()) / 1000)} секунд.
            </Alert>
          )}

          <NavButton
            text={loading ? "Подождите..." : "Войти"}
            onClick={click}
            disabled={loading || lockoutTime > Date.now()}
          />

          <div className={styles.link}>
            <LinkGrey text="Проблемы со входом?" href={FORGOTE_ROUTE}></LinkGrey>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
});

export default SignPage;
