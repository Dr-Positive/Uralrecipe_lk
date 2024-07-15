import { makeAutoObservable } from "mobx";

export default class AlertStore {
  constructor() {
    this._alerts = [];
    makeAutoObservable(this);
  }

  setAlerts(alerts) {
    this._alerts = alerts;
  }

  get alerts() {
    return this._alerts;
  }
  get titles() {
    return this._alerts.map(alert => alert.title);
  }
  get texts() {
    return this._alerts.map(alert => alert.text);
  }
  get dates() {
    return this._alerts.map(alert => alert.cratedAt);
  }
  get types() {
    return this._alerts.map(alert => alert.dispt);
  }
}
