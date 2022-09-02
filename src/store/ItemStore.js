import {makeAutoObservable} from "mobx";

export default class ItemStore {
    constructor() {
        this._categories = []

        this._downCategories = []

        this._brands = []

        this._items = []

        this._basketItems = []

        this._page = 1
        this._totalCount = 0
        this._limit = 12

        this._currentCategory = -1
        this._currentDownCategory = -1
        this._currentBrand = -1

        this._currentAvailability = false

        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }

    setDownCategories(downCategories) {
        this._downCategories = downCategories
    }

    setBrands(brands) {
        this._brands = brands
    }

    setItems(items) {
        this._items = items
    }

    setCurrentCategory(id) {
        this._currentCategory = id
    }

    setCurrentDownCategory(id) {
        this._currentDownCategory = id
    }

    setCurrentBrand(id) {
        this._currentBrand = id
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setBasketItems(basketItems) {
        this._basketItems = basketItems
    }

    setCurrentAvailability(availability) {
        this._currentAvailability = availability
    }

    get categories() {
        return this._categories
    }

    get downCategories() {
        return this._downCategories
    }

    get brands() {
        return this._brands
    }

    get items() {
        return this._items
    }

    get currentCategory() {
        return this._currentCategory
    }

    get currentDownCategory() {
        return this._currentDownCategory
    }

    get currentBrand() {
        return this._currentBrand
    }

    get basketItems() {
        return this._basketItems
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }

    get currentAvailability() {
        return this._currentAvailability
    }
}