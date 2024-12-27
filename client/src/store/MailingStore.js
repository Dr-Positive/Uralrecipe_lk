import { makeAutoObservable } from "mobx";

export default class MailingStore {
  constructor() {
    this._alerts = [];
    makeAutoObservable(this);
  }

  setMailing(mailings) {
    this._alerts = mailings;
  }

  get mailings() {
    return this._alerts;
  }

  get titles() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(mailing => mailing.title);
  }

  get texts() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(mailing => mailing.text);
  }

  get dates() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(mailing => mailing.date);
  }

  get types() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(mailing => mailing.dispt);
  }

  get mounth() {
    if (!this._alerts || this._alerts.length === 0) return [];
    return this._alerts.map(mailing => mailing.mounth);
  }
}