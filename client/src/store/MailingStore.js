import { makeAutoObservable } from "mobx";

export default class MailingStore {
  constructor() {
    this._mailings = [];
    makeAutoObservable(this);
  }

  setMailings(mailings) {
    this._mailings = mailings;
  }

  addMailing(mailing) {
    this._mailings.push(mailing);
  }

  get mailings() {
    return this._mailings;
  }

  get titles() {
    return this._mailings.map(mailing => mailing.title);
  }

  get alerts() {
    return this._mailings;
  }

  get titles() {
    if (!this._mailings || this._mailings.length === 0) return [];
    return this._mailings.map(mailing => mailing.title);
  }

  get texts() {
    if (!this._mailings || this._mailings.length === 0) return [];
    return this._mailings.map(mailing => mailing.text);
  }

  get dates() {
    if (!this._mailings || this._mailings.length === 0) return [];
    return this._mailings.map(mailing => mailing.date);
  }

  get dispt() {
    if (!this._mailings || this._mailings.length === 0) return [];
    return this._mailings.map(mailing => mailing.dispt);
  }

  get div() {
    if (!this._mailings || this._mailings.length === 0) return [];
    return this._mailings.map(mailing => mailing.div);
  }
}