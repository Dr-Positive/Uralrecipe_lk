import React, {createContext} from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import UserStore  from './store/UserStore.js'
import AlertStore from './store/AlertStore.js';
import MailingStore from './store/MailingStore.js';
import { BrowserRouter } from "react-router-dom"; // Импортируем BrowserRouter
import ReactDOM from 'react-dom/client';
import './styles/mainStyle.scss';

export const Context = createContext(null);

const userStore = new UserStore();
const alertStore = new AlertStore();
const mailingStore = new MailingStore();

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Context.Provider value={{
        user: userStore,
        alert: alertStore,
        mailing: mailingStore

    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>
);