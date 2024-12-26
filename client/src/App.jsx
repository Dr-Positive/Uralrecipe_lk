import './styles/variables.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes, adminRoutes } from './routes.jsx';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index.js';
import { LK_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE } from './utils/consts';
import { observer } from 'mobx-react-lite';
import useUserChecked  from './hooks/useUserChecked.js';

const App = observer(() => {
    const { user } = useContext(Context);
    const [userChecked, setUserChecked] = useState(false); // Проверка состояния пользователя

    useEffect(() => {
        console.log("isAuth:", user.isAuth);
        console.log("isAdmin:", user.isAdmin);

        // Переадресация происходит только после проверки пользователя
        if (userChecked) {
            if (user.isAuth && user.isAdmin) {
                return <Navigate to={ADMIN_ROUTE} replace />;
            } else if (user.isAuth) {
                return <Navigate to={LK_ROUTE} replace />;
            } else {
                return <Navigate to={LOGIN_ROUTE} replace />;
            }
        }
    }, [userChecked, user.isAuth, user.isAdmin]);

    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            {authRoutes.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        user.isAuth ? <Component /> : <Navigate to={LOGIN_ROUTE} replace />
                    }
                />
            ))}
            {adminRoutes.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        user.isAuth && user.isAdmin ? <Component /> : <Navigate to={LK_ROUTE} replace />
                    }
                />
            ))}
        </Routes>
    );
});

export default App;
