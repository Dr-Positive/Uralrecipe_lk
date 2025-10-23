import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmEmailChange } from "../http/authApi.js";
import styles from "./ConfirmEmailPage.module.scss";
import { observer } from "mobx-react-lite";

const ConfirmEmailPage = observer(() => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Проверка ссылки...");
    const token = searchParams.get("token");

    useEffect(() => {
        async function confirm() {
            try {
                if (!token) {
                    setMessage("Ошибка: токен не найден.");
                    return;
                }

                const res = await confirmEmailChange(token);
                if (res.success) {
                    setMessage("✅ Email успешно подтверждён!");
                } else {
                    setMessage(res.message || "Ошибка при подтверждении.");
                }
            } catch (error) {
                setMessage("Ошибка сервера при подтверждении email.");
            }
        }

        confirm();
    }, [token]);

    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <h1>{message}</h1>
            </div>
        </div>
    );
})

export default ConfirmEmailPage;