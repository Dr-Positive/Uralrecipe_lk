import styles from "./ProfilePage.module.scss";
import { useState, useContext } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { requestResetToken, requestEmailChange } from "../http/authApi.js";
import { logining } from "../http/userAPI";

const ProfilePage = observer(() => {
  const { user } = useContext(Context);

  // 🔹 Общие состояния
  const [mode, setMode] = useState(null); // "password" | "email"
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  // 🔸 Модалка подтверждения пароля
  const [showConfirm, setShowConfirm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');

  // 🔸 Модалка смены email
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handlePasswordConfirm = (selectedMode) => {
    setMode(selectedMode);
    setShowConfirm(true);
    setConfirmError('');
    setOldPassword('');
  };

  const handleEmailConfirm = (selectedMode) => {
    setMode(selectedMode);
    setShowConfirm(true);
    setConfirmError('');
    setOldPassword('');
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setConfirmError('');
    setOldPassword('');
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setEmailError('');
    setNewEmail('');
  };

  // 🔹 Проверка пароля (перед действием)
  const handlePasswordCheck = async () => {
    if (!oldPassword) {
      setConfirmError("Введите текущий пароль.");
      return;
    }

    try {
      const data = await logining(user.user.login, oldPassword);
      console.log("Проверка пароля прошла:", data);

      if (mode === "email") {
        // если цель — изменить email
        setShowConfirm(false);
        setTimeout(() => setShowEmailModal(true), 300);
      } else if (mode === "password") {
        // если цель — изменить пароль
        const resetResponse = await requestResetToken(data.login, oldPassword);
        console.log("Ссылка сброса:", resetResponse.resetLink);

        setAlertMessage("Инструкция по смене пароля отправлена на вашу почту.");
        setAlertVariant("success");
        handleCloseConfirm();
      }
    } catch (err) {
      console.error("Ошибка при проверке пароля:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Ошибка при проверке пароля.";
      setConfirmError(message);
    }
  };

  // 🔹 Смена email
  const handleEmailChange = async () => {
    if (!newEmail) {
      setEmailError("Введите новый email.");
      return;
    }

    try {
      const response = await requestEmailChange(
        user.user.login,
        oldPassword, // используем пароль, введённый на первом шаге
        newEmail
      );

      setAlertMessage(
        response.message ||
        "Письмо для подтверждения отправлено на новый email."
      );
      setAlertVariant("success");
      handleCloseEmailModal();
    } catch (err) {
      console.error("Ошибка при смене email:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Ошибка при обновлении email.";
      setEmailError(message);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.row}>
          <a className={styles.link__main} href="https://u-rm.ru/">
            <h5 className={styles.link__text}>Главная страница</h5>
          </a>
          <div className={styles.logo__img} />
          <a className={styles.text}>Профиль</a>
        </div>

        <div className={styles.containerMain}>
          <div className={styles.containerBlock}>
            <div className={styles.containerBlock__title}><h3>Связь</h3></div>
            <div className={styles.containerBlock__text}>
              <p>Email: {user.user?.email || "—"}</p>
            </div>
            <div className={styles.containerBlock__text}>
              <p>Номер телефона: {user.user?.tel || "—"}</p>
            </div>
            <div className={styles.containerBlock__text}>
              <p>Роль: {user.user?.admin ? "Администратор" : "Пользователь"}</p>
            </div>

            <div className={styles.containerBlock__title}>
              <Button variant="success" onClick={() => handlePasswordConfirm("password")}>
                Изменить пароль
              </Button>
            </div>

            {/* <div className={styles.containerBlock__title}>
              <Button variant="success" onClick={() => handleCloseEmailModal("email")}>
                Изменить/добавить email
              </Button>
            </div> */}

            {alertMessage && (
              <Alert variant={alertVariant} className="mt-3">
                {alertMessage}
              </Alert>
            )}

            {/* 🔸 Модалка подтверждения пароля */}
            <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
              <Modal.Header closeButton>
                <Modal.Title>Подтверждение пароля</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Введите текущий пароль для подтверждения действия:</p>
                <input
                  type="password"
                  placeholder="Текущий пароль"
                  className={styles.input_confirm}
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                />
                {confirmError && (
                  <Alert variant="danger" className="mt-3">{confirmError}</Alert>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirm}>Отмена</Button>
                <Button variant="success" onClick={handlePasswordCheck}>Подтвердить</Button>
              </Modal.Footer>
            </Modal>

            {/* 🔹 Модалка смены email */}
            <Modal show={showEmailModal} onHide={handleCloseEmailModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Изменение email</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Введите новый адрес электронной почты:</p>
                <input
                  type="email"
                  placeholder="Новый email"
                  className={styles.input_confirm}
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                />
                {emailError && (
                  <Alert variant="danger" className="mt-3">{emailError}</Alert>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEmailModal}>Отмена</Button>
                <Button variant="success" onClick={handleEmailChange}>Сохранить</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
});

export default ProfilePage;
