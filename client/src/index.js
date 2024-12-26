import React, {createContext} from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore  from './store/UserStore'
import AlertStore from './store/AlertStore';
import { BrowserRouter } from "react-router-dom"; // Импортируем BrowserRouter
import ReactDOM from 'react-dom/client';

export const Context = createContext(null);

const userStore = new UserStore();
const alertStore = new AlertStore();

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Context.Provider value={{
        user: userStore,
        alert: alertStore,
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
);