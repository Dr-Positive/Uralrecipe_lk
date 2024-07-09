import { makeAutoObservable } from "mobx";

export default class AlertStore {
    constructor() {
        this._titles = []
        this._texts =  []
        this._dates =  []
        this._selectedType = []

        makeAutoObservable(this)
    }


    setTitles(titles) {
        this._titles = titles
    }
    setTexts(texts) {
        this._texts = texts
    }
    setDates(dates) {
        this._dates = dates
    }
    setSelectedType(types) {
        this._selectedType = types
    }

    get titles() {
        return this._titles
    }
    get texts() {
        return this._texts
    }
    get dates() {
        return this._dates
    }
    get types() {
        return this._types
    }
}