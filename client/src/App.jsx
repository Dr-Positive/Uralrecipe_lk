import './styles/variables.scss';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, guestRoutes, adminRoutes } from './routes.jsx';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index.js';
import { GUEST_ROUTE, ADMIN_ROUTE, MAIN_ROUTE } from './utils/consts';
import { observer } from 'mobx-react-lite';

import { jwtDecode } from 'jwt-decode';
const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                user.setUser({ id: decoded.id, role: decoded.role, compl: decoded.compl });
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

            {/* Редирект на страницу входа */}
            <Route path="*" element={<Navigate to={user.isAuth ? MAIN_ROUTE : GUEST_ROUTE} replace />} />
        </Routes>
    );
});

export default App;
