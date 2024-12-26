import { makeAutoObservable, observable } from "mobx";

export default class UserStore {
    constructor(){
        this._isAuth = false
        this._isAdmin = false
        //this._isAuth = true
        //this._isAdmin = true
        this._user = {}
        makeAutoObservable(this);
    }


    setIsAuth(bool) {
        this._isAuth = bool
        console.log('Сохранённый this auth:', this._isAuth);
        console.log("setIsAuth вызван с:", bool);
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
        console.log('Сохранённый this admin:', this._isAdmin);
        console.log("setIsAdmin вызван с:", bool);
        
    }

    setUser(user) {
        console.log('Переданные данные в setUser:', user);
        this._user = user; // Сохранение данных
        console.log('Сохранённый this._user:', this._user);
        console.log("setUser вызван с:", user);
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get isAdmin() {
        return this._isAdmin
    }    
}


