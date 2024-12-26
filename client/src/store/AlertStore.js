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
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(alert => alert.title);
  }

  get texts() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(alert => alert.text);
  }

  get dates() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(alert => alert.date);
  }

  get types() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(alert => alert.dispt);
  }

  get mounth() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(alert => alert.mounth);
  }
}