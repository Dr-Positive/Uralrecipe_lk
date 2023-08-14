import { makeAutoObservable } from "mobx";

export default class AlertStore {
    constructor(){
        this._alerts = [
            {id: 1, title: "проф осмотр", text: "Пройдите проф осмотр", date: "2023-07-24"},
            {id: 2, title: "диспансеризация", text: "Пройдите диспансеризацию", date: "2023-08-13"},
            {id: 3, title: "диспансерное наблюдение", text: "Пройдите диспансерное наблюдение", date: "2023-08-02"}
        ]
        makeAutoObservable(this)
    }


    setAlerts(alerts) {
        this._alerts = alerts
    }

    get alerts() {
        return this._alerts
    }
}