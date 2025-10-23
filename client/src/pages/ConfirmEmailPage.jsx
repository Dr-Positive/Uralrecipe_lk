import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmEmailChange } from "../http/authApi.js";
import { Context } from "../index.js";
import styles from "./ConfirmEmailPage.module.scss";
import { observer } from "mobx-react-lite";

const ConfirmEmailPage = observer(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const [message, setMessage] = useState("Проверка ссылки...");
  const token = searchParams.get("token");

  useEffect(() => {
    async function confirm() {
      try {
        if (!token) {
          setMessage("❌ Ошибка: токен не найден.");
          return;
        }

        const res = await confirmEmailChange(token);

        if (res.success) {
          // 🟢 если сервер вернул новый JWT
          if (res.token) {
            localStorage.setItem("token", res.token);
          }

          // 🟢 обновляем mobx store
          if (res.user) {
            user.setUser(res.user);
            user.setIsAuth(true);
          }

          setMessage("✅ Email успешно подтверждён!");
          // 🔁 перенаправляем на профиль через 3 секунды
          setTimeout(() => navigate("/profile"), 3000);
        } else {
          setMessage(res.message || "Ошибка при подтверждении.");
        }
      } catch (error) {
        console.error("Ошибка при подтверждении email:", error);
        setMessage("Ошибка сервера при подтверждении email.");
      }
    }

    confirm();
  }, [token, navigate, user]);

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <h1>{message}</h1>
      </div>
    </div>
  );
});

export default ConfirmEmailPage;
