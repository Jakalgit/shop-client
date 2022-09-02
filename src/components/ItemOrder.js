import React, {useContext, useEffect, useState} from 'react';
import BasketCss from "../css/components/Basket.module.css";
import {Context} from "../index";
import {fetchOneItem} from "../http/API/itemAPI";

const ItemOrder = (props) => {

    const {item} = useContext(Context)

    const [drawItem, setDrawItem] = useState({})

    useEffect(() => {
        fetchOneItem(props.itemId).then(data => setDrawItem(data))
    }, [item.basketItems])

    return (
        <div>
            <div className={BasketCss.shopping_card_block + ' shopping-card-block col-xxl-8 offset-xxl-2 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                <div className={BasketCss.card_item + ' card-item col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                    <div className={BasketCss.card_image + ' card-image col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12'}>
                        <img src={process.env.REACT_APP_API_URL + drawItem.img} alt="" className={BasketCss.image + ' image'}/>
                    </div>
                    <div className={BasketCss.card_text + ' card-text col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12'}>
                        <div className={BasketCss.line_up + ' line-up'}>
                            <h1 className={BasketCss.card_name + ' card-name col-xxl-8 offset-xxl-1 col-xl-8 offset-xl-1 col-lg-8 offset-lg-1 col-md-8 offset-md-1 col-sm-8 offset-sm-1 col-10 offset-1'}>{drawItem.name}</h1>
                        </div>
                        <div className={BasketCss.count + ' count col-xxl-2 offset-xxl-1 col-xl-2 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-4 offset-4'}
                             onClick={event => event.stopPropagation()}>
                            <h2 className='count-text'>{props.count + 'шт'}</h2>
                        </div>
                        <h2 className={BasketCss.text_price_one + ' text-price-one col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-1 col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-5 offset-sm-1 col-12'}>{'Цена: ' +
                            drawItem.price + ' руб.'}</h2>
                        <h2 className={BasketCss.text_price_full + ' text-price-full col-xxl-8 offset-xxl-1 col-xl-8 offset-xl-1 col-lg-8 offset-lg-1 col-md-9 offset-md-1 col-sm-11 offset-sm-1 col-12'}>{'Сумма: '+ drawItem.price * props.count + ' руб.'}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemOrder;