import React, {useContext, useEffect, useState} from 'react';
import "../css/components/Alert.css"
import CatalogCss from "../css/Catalog.module.css";
import style_css from "../css/FindPage.module.css"
import height from "../css/General.module.css"
import {fetchItems} from "../http/API/itemAPI";
import Item from "../components/Item";
import Alert from "../components/Alert";
import Footer from "../components/Footer";
import {Context} from "../index";
import general from "../css/General.module.css";
import {Spinner} from "react-bootstrap";
import Fade from "react-reveal/Fade";

const FindPage = () => {

    const {user} = useContext(Context)

    const [searchValue, setSearchValue] = useState(String(user.searchValue))
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchItems().then(data => {
            setItems(data)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (String(user.searchValue)) {
            setFilteredItems(Object.values(items).filter(item => {
                return item.name.toLowerCase().includes(searchValue.toLowerCase())
            }))
        }
    }, [items])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const searchClick = () => {

        if (searchValue) {
            setFilteredItems(Object.values(items).filter(item => {
                return item.name.toLowerCase().includes(searchValue.toLowerCase())
            }))
        } else {
            setFilteredItems([])
            setStyle('danger')
            setMessage("Введите текст")
            setStart(true)
        }

    }

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
            <div className={height.height}>
                <Fade top>
                    <div style={{marginTop: "8rem"}} className={CatalogCss.find_block}>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className={CatalogCss.back_shadow + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-12 offset-0'}>
                                        <div className={CatalogCss.padding + ' container'}>
                                            <div className="row">
                                                <input type="text"
                                                       value={searchValue}
                                                       onChange={event => setSearchValue(event.target.value)}
                                                       className={CatalogCss.input + ' col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8'}
                                                       placeholder="Поиск товаров..."/>
                                                <button onClick={searchClick}
                                                        className={CatalogCss.find + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                                                    Найти
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
                {searchValue && filteredItems.length !== 0 ?
                    <div className={style_css.items}>
                        <div className="container">
                            <div className="row">
                                {filteredItems.map(item =>
                                    <Item key={item.id}
                                          name={item.name}
                                          id={item.id}
                                          price={item.price}
                                          oldPrice={item.old_price}
                                          discount={item.discount}
                                          discountFlag={item.discount_flag}
                                          availability={item.availability}
                                          image={item.img}
                                          updateMessage={(value) => updateMessage(value)}
                                          updateStart={(value) => updateStart(value)}
                                          updateStyle={(value) => updateStyle(value)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    <Fade>
                        <div className="row">
                            <h2 className={style_css.empty_text}>Пусто...</h2>
                        </div>
                    </Fade>
                }
            </div>
            <Footer />
        </div>
    );
};

export default FindPage;