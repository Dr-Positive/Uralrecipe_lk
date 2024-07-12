// import './styles/variables.css';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { authRoutes, publicRoutes } from './routes.jsx';
// import { useContext, useEffect,useState } from 'react';
// import { Context } from './index.js';
// import { LK_ROUTE, LOGIN_ROUTE } from './utils/consts';
// import {check} from "./http/userAPI";
// import {Spinner} from "react-bootstrap";
// import {observer} from "mobx-react-lite";

// const App = observer(() => {
//   const {user} = useContext(Context)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//       check().then(data => {
//           user.setUser(true)
//           user.setIsAuth(true)
//       }).finally(() => setLoading(false))
//   }, [])
    

//   if (loading) {
//       return <Spinner animation={"grow"}/>
//   }
//   return (
//     <BrowserRouter>
//       <Routes>
//         {authRoutes.map(({ path, Component }) => (
//           <Route key={path} path={path} element={<Component />} exact />
//         ))}
//         {publicRoutes.map(({ path, Component }) => (
//           <Route key={path} path={path} element={<Component />} exact />
//         ))}
//       </Routes>
//     </BrowserRouter>
//   );
// });

// export default App;


import './styles/variables.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from './routes.jsx';
import { useContext, useEffect } from 'react';
import { Context } from './index.js';
import { LK_ROUTE, LOGIN_ROUTE } from './utils/consts';




const App = () => {
  const { user } = useContext(Context);


  useEffect(() => {
    if (user.isAuth) {
      // Перенаправляем на страницу "lkpage", если пользователь аутентифицирован
      <Navigate to={LK_ROUTE} replace />;
    } else {
      // Перенаправляем на страницу "signpage", если пользователь не аутентифицирован
      <Navigate to={LOGIN_ROUTE} replace />;
    }
  }, [user.isAuth]);




  return (
    <BrowserRouter>
      <Routes>
        {authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;