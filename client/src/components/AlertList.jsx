import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';
import AlertCard from './AlertCard';

const AlertList = observer(() => {
  const { alert } = useContext(Context);

  if (!alert.alerts || !Array.isArray(alert.alerts)) {
    return <div>...loading</div>;
  }

  return (
    <div>
      {alert.alerts.map(alert => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  );
});

export default AlertList;
