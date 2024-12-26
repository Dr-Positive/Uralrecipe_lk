import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const useUserChecked = (user) => {
    const [userChecked, setUserChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                // Устанавливаем данные пользователя в store
                user.setUser({
                    id: decodedToken.id,
                    role: decodedToken.role,
                    compl: decodedToken.compl,
                });
                user.setIsAuth(true);

                if (decodedToken.role === "ADMIN") {
                    user.setIsAdmin(true);
                }

                console.log("Пользователь авторизован:", decodedToken);
            } catch (error) {
                console.error("Ошибка при декодировании токена:", error);
                localStorage.removeItem("token");
            }
        } else {
            console.log("Токен отсутствует, пользователь не авторизован");
        }

        // Устанавливаем флаг, что проверка завершена
        setUserChecked(true);
    }, [user]);

    return { userChecked, setUserChecked };
};
