import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAdmin = false
        this._user = {}
        this._basketId = {}
        this._searchValue = ''
        this._searchOrdersValue = ''
        makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    setBasket(basketId) {
        this._basketId = basketId
    }

    setSearchValue(searchValue) {
        this._searchValue = searchValue
    }

    setSearchOrdersValue(value) {
        this._searchOrdersValue = value
    }

    get user() {
        return this._user
    }

    get isAdmin() {
        return this._isAdmin
    }

    get basket() {
        return this._basketId
    }

    get searchValue() {
        return this._searchValue
    }

    get searchOrdersValue() {
        return this._searchOrdersValue
    }
}