import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';
import AlertCard from './AlertCard';

const AlertList = observer(() => {
  const { alert, user } = useContext(Context);

  // Проверяем, авторизован ли пользователь
  if (!user.isAuth) {
    return <div>...loading</div>;
  }

  // Проверяем наличие роли пользователя и алертов
  if (!user.user.role || !alert.alerts || alert.alerts.length === 0) {
    return <div>...loading</div>;
  }

  console.log("Current user:", user.user);
  console.log("All alerts:", alert.alerts);

  // Фильтрация алертов в зависимости от роли пользователя
  const filteredAlerts = user.user.role === 'ADMIN'
    ? alert.alerts // Возвращаем все алерты для администраторов
    : alert.alerts.filter(a => {
      const userCompl = user.user.compl;

      // Проверяем, что userCompl не null или undefined и является целым числом
      if (userCompl === null || userCompl === undefined || !Number.isInteger(userCompl)) return false;

      // Проверяем, что a.compl также является целым числом
      if (!Number.isInteger(a.compl)) return false;

      // Сравниваем значения
      return a.compl === userCompl;
    });

  return (
    <div>
      {filteredAlerts.length > 0 ? (
        filteredAlerts.map(alert => (
          <AlertCard key={alert.id} alert={alert} />
        ))
      ) : (
        <div>Сообщения отсутствуют</div>
      )}
    </div>
  );
});

export default AlertList;
