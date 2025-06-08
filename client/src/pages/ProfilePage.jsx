import styles from "./ProfilePage.module.scss";
import NavButton from "../components/NavButton";
import { useState, useContext } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { requestResetToken } from "../http/authApi.js";
import { GUEST_ROUTE, ADMIN_ROUTE, MAIN_ROUTE, PASSWORD_ROUTE } from '../utils/consts.js';
const ProfilePage = observer(() => {
    const { user } = useContext(Context);

    const [showConfirm, setShowConfirm] = useState(false);
    const [showChange, setShowChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [login, setLogin] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const handleOpenConfirm = () => setShowConfirm(true);
    const handleCloseConfirm = () => setShowConfirm(false);

    const handleOpenChange = () => setShowChange(true);
    const handleCloseChange = () => setShowChange(false);

    const handleConfirmPassword = async () => {
        try {



            // Закрываем окно подтверждения и открываем окно смены пароля
            setShowConfirm(false);
            setCurrentPassword('');
            setShowChange(true);
        } catch (error) {
            alert(error.message || 'Неверный пароль');
        }
    };

    const handlePasswordChange = async () => {
        const login = user.user.login;
        try {
            if (!login || !oldPassword) {
                alert("Введите логин и текущий пароль");
                return;
            }

            console.log("Логин:", login);
            console.log("Отправка запроса с:", { login, oldPassword });

            const data = await requestResetToken(login, oldPassword);

            console.log("Ответ от сервера:", data);

            if (data.success && data.resetLink) {
                window.location.href = data.resetLink;
            } else {
                alert(data.message || "Не удалось получить ссылку сброса пароля");
            }
        } catch (error) {
            console.error("Ошибка при получении токена:", error);
            alert(error.response?.data?.message || "Ошибка запроса");
        }
    };
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.row}>
                    <a className={styles.link__main} href={"https://https://u-rm.ru/"}>
                        <h5 className={styles.link__text}>Главная страница</h5>
                    </a>
                    <div className={styles.logo__img} />
                    <a className={styles.text}>Профиль</a>
                </div>

                <div className={styles.containerMain}>
                    <div className={styles.containerBlock}>
                        <div className={styles.containerBlock__title}><h3>Связь</h3></div>
                        <div className={styles.containerBlock__text}><p>Email: {user.email}</p></div>
                        <div className={styles.containerBlock__text}><p>Номер телефона: {user.tel}</p></div>
                        <div className={styles.containerBlock__text}><p>Роль: {user.admin ? "Администратор" : "Пользователь"}</p></div>

                        <Button variant="success" onClick={handleOpenConfirm}>Изменить пароль</Button>


                        {/* Модальное окно подтверждения пароля */}
                        <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Подтвердить пароль</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Введите текущий пароль для подтверждения действия.</p>
                                <input
                                    type="password"
                                    placeholder="Пароль"
                                    className={styles.input_confirm}
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseConfirm}>Отмена</Button>
                                <Button variant="primary" onClick={handleConfirmPassword}>Подтвердить</Button>
                                <Button variant="success" onClick={handlePasswordChange} >Изменить пароль</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>

                <div className={styles.containerMain}>
                    <div className={styles.containerBlock}>
                        <div className={styles.containerBlock__title}><h3>Личные данные</h3></div>
                        <div className={styles.containerBlock__text}><p>Снилс: {user.email}</p></div>
                        <div className={styles.containerBlock__text}><p>Номер договора: {user.tel}</p></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
});

export default ProfilePage;
