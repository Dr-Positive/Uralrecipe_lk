import './styles/variables.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from './routes.jsx';
import { useContext, useEffect,useState } from 'react';
import { Context } from './index.js';
import { LK_ROUTE, LOGIN_ROUTE } from './utils/consts';
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      check().then(data => {
          user.setUser(true)
          user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [])
    

  if (loading) {
      return <Spinner animation={"grow"}/>
  }
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
});

export default App;