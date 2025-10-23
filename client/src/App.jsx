import './styles/mainStyle.scss';
import { BrowserRouter, Routes, Route, Navigate,useLocation } from "react-router-dom";
import { authRoutes, guestRoutes, adminRoutes } from './routes.jsx';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index.js';
import { GUEST_ROUTE, ADMIN_ROUTE, MAIN_ROUTE,PASSWORD_ROUTE,forgot_ROUTE } from './utils/consts';
import { observer } from 'mobx-react-lite';

import { jwtDecode } from 'jwt-decode';
const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Получаем текущий путь
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                user.setUser({id: decoded.id, login: decoded.login, email: decoded.email, tel: decoded.tel, compl: decoded.compl, role: decoded.role});
                user.setIsAuth(true);
                user.setIsAdmin(decoded.role === 'ADMIN');
            } catch (error) {
                console.error('Ошибка при декодировании токена:', error);
                user.setIsAuth(false);
                localStorage.removeItem('token');
            }
        }
        setLoading(false); // Устанавливаем `loading` в `false`, когда проверка завершена
    }, [user]);

    if (loading) {
        // Отображаем загрузочный экран, пока идет проверка токена
        return <div>Загрузка...</div>;
    }

    return (
        <Routes>
            {/* Общедоступные маршруты */}
            {guestRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {/* Отдельный маршрут для страницы восстановления пароля */}
            <Route path={PASSWORD_ROUTE} />

            {/* Маршруты для авторизованных пользователей */}
            {authRoutes.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        user.isAuth ? <Component /> : <Navigate to={GUEST_ROUTE} replace />
                    }
                />
            ))}

            {/* Маршруты для администратора */}
            {adminRoutes.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        user.isAuth && user.isAdmin ? <Component /> : <Navigate to={MAIN_ROUTE} replace />
                    }
                />
            ))}

            {/* Обработчик переадресации для неавторизованных пользователей */}
            <Route
                path="*"
                element={
                    !user.isAuth ? <Navigate to={GUEST_ROUTE} replace /> : <Navigate to={MAIN_ROUTE} replace />
                }
            />
        </Routes>
    );
});

export default App;
