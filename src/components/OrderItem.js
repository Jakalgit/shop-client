import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {
     decrementOrderItem,
    deleteOrderItem,
    fetchOrderItem,
    incrementOrderItem
} from "../http/API/orderItemAPI";
import BasketCss from "../css/components/Basket.module.css";

const OrderItem = (props) => {

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const [countValue, setCountValue] = useState(props.count)
    const [drawItem, setDrawItem] = useState({})
    const [price, setPrice] = useState('')
    const [fullPrice, setFullPrice] = useState('')

    const setFull = () =>{
        let sm = ''
        if (price.length > 3) {
            sm = price.slice(0, price.length-4) + price.slice(price.length-3, price.length)
        } else {
            sm = price
        }

        let fullPriceData = (Number(sm) * countValue).toString()

        if (fullPriceData.length > 3) {
            fullPriceData = fullPriceData.slice(0, fullPriceData.length - 3) + ' ' + fullPriceData.slice(fullPriceData.length - 3, fullPriceData.length)

            if (fullPriceData.length > 7) {
                fullPriceData = fullPriceData.slice(0, fullPriceData.length - 7) + ' ' + fullPriceData.slice(fullPriceData.length - 7, fullPriceData.length)
            }
        }

        setFullPrice(fullPriceData)
    }

    useEffect(() => {
        fetchOrderItem(props.itemId).then(data => {
            let priceData = data.price.toString()
            if (priceData.length > 3) {
                setPrice((priceData.slice(0, priceData.length - 3) + ' ' + priceData.slice(priceData.length - 3, priceData.length)).toString())
            } else {
                setPrice(priceData)
            }

            setDrawItem(data)
        })
    }, [])

    useEffect(() => {
        setFull()
    }, [price, countValue])

    const increment = () => {
        if (countValue < 99) {
            incrementOrderItem(role, props.itemId).then(() => {
                setCountValue(countValue + 1)
                props.updateItems()
            })
            setFull()
        }
    }

    const decrement = () => {
        if (countValue > 1) {
            decrementOrderItem(role, props.itemId).then(() => {
                setCountValue(countValue - 1)
                props.updateItems()
            })
            setFull()
        }
    }

    const deleteBasketItem = () => {
        deleteOrderItem(role, props.itemId).then(() => {
            setDrawItem({})
            props.updateItems()
        })
    }

    return (
        <div className={BasketCss.item + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
            <h1 className={BasketCss.item_name + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{drawItem.name}</h1>
            <div className={BasketCss.img + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                <img src={process.env.REACT_APP_API_URL + drawItem.img} alt="" className={BasketCss.image}/>
            </div>
            <h2 className={BasketCss.first_price + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{price + ' ₽'}</h2>
            <div className={BasketCss.counter + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                <div className={BasketCss.change} onClick={decrement}>
                    <img src={require("../img/chevron-left.svg")} alt="" className={BasketCss.chevron}/>
                </div>
                <h2 className={BasketCss.count}>{countValue}</h2>
                <div className={BasketCss.change} onClick={increment}>
                    <img src={require("../img/chevron-right.svg")} alt="" className={BasketCss.chevron}/>
                </div>
            </div>
            <div className={BasketCss.help_delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                <div className={BasketCss.delete_item} onClick={deleteBasketItem}>
                    <img src={require("../img/x_white.svg")} alt="" className={BasketCss.delete}/>
                </div>
            </div>
            <h2 className={BasketCss.full_price + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{fullPrice + ' ₽'}</h2>
        </div>
    );
};

export default OrderItem;