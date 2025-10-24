// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const LoginForm = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [lockTime, setLockTime] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (lockTime > 0) {
      const timer = setInterval(() => {
        setLockTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [lockTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (lockTime > 0) {
      setErrorMessage(`Попробуйте снова через ${lockTime} секунд.`);
      return;
    }

    try {
      // Ваш запрос на сервер для проверки логина и пароля
      // Если успешный вход:
      setAttempts(0);
      setErrorMessage('');
      onLoginSuccess();
    } catch (error) {
      setAttempts(prev => prev + 1);
      if (attempts + 1 >= 3) {
        const newLockTime = Math.min(15 * Math.pow(2, attempts - 2), 300); // Максимум 5 минут
        setLockTime(newLockTime);
        setErrorMessage(`Слишком много неудачных попыток. Блокировка на ${newLockTime} секунд.`);
      } else {
        setErrorMessage('Неверный логин или пароль.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Логин"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Войти</button>
      </form>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
};

export default LoginForm;
