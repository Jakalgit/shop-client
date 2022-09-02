import React, {useEffect, useState} from 'react';
import {fetchItems} from "../http/API/itemAPI"
import general from "../css/General.module.css";
import {Spinner} from "react-bootstrap";
import Alert from "../components/Alert";
import Fade from "react-reveal/Fade";
import style_css from "../css/DiscountCatalog.module.css";
import Item from "../components/Item";
import CatalogCss from "../css/Catalog.module.css";
import Footer from "../components/Footer";

const PopularCatalog = () => {

    const [loading, setLoading] = useState(true)

    const [items, setItems] = useState([])

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    useEffect(() => {
        fetchItems().then(data => {
            let mas = []
            data.sort((a, b) => a.count_shop <= b.count_shop ? 1 : -1)
            for (let i = 0; i < (data.length > 12 ? 12 : data.length); i++) {
                if (data[i].count_shop !== '0') {
                    mas.push(data[i])
                }
            }
            setItems(mas)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const updateMessage = (value) => {
        setMessage(value)
    }

    const updateStart = (value) => {
        setStart(value)
    }

    const updateStyle = (value) => {
        setStyle(value)
    }

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>

            <div className={general.height}>

                {items.length !== 0 ?
                    <div>
                        <Fade>
                            <h2 className={style_css.text}>Популярные товары</h2>
                        </Fade>

                        <div className="items">
                            <div className="container">
                                <div className="row">
                                    {items.map(item => <Item
                                            name={item.name}
                                            id={item.id}
                                            image={item.img}
                                            price={item.price}
                                            oldPrice={item.old_price}
                                            discount={item.discount}
                                            discountFlag={item.discount_flag}
                                            availability={item.availability}
                                            updateMessage={(value) => updateMessage(value)}
                                            updateStart={(value) => updateStart(value)}
                                            updateStyle={(value) => updateStyle(value)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Fade>
                        <div className="row">
                            <h2 style={{marginTop: "40vh"}} className={CatalogCss.empty_text}>Готовится, заходите позже</h2>
                        </div>
                    </Fade>
                }
            </div>

            <Footer />

        </div>
    );
};

export default PopularCatalog;