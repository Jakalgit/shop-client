import React, {useContext, useEffect, useState} from 'react';
import FiltersCss from '../css/components/Filters.module.css';
import {Context} from "../index";
import Fade from "react-reveal/Fade";
import {fetchScales} from "../http/API/scaleAPI";

const Filters = (props) => {

    const {item} = useContext(Context)

    const [drawCategories, setDrawCategories] = useState([])
    const [currentCategoryId, setCategoryId] = useState(item.currentCategory)

    const [scales, setScales] = useState([])

    useEffect(() => {
        drawCategory()
    }, [currentCategoryId])

    useEffect(() => {
        fetchScales().then(data => {
            setScales(data)
        })
    }, [])

    const drawCategory = () => {

        setDrawCategories([])

        if (item.downCategories && currentCategoryId !== -1) {
            let mas = []
            item.downCategories.map(el => el.categoryId === currentCategoryId ? mas.push(el) : null)
            setDrawCategories(mas)
        }
    }

    const currentScale = (scale) => {
        if (props.currentScale !== null) {
            if (scale.id === props.currentScale.id) {
                props.updateScale(null)
            } else {
                props.updateScale(scale)
            }
        } else {
            props.updateScale(scale)
        }
    }

    const changeCurrentAvailability = () => {
        if (item.currentAvailability) {
            item.setCurrentAvailability(false)
        } else {
            item.setCurrentAvailability(true)
        }
    }

    return (
        <Fade>
            <div className={FiltersCss.filters}>
                <div className="container">
                    <div className="row">
                        <div className={FiltersCss.out_of_stock}>
                            <input type="checkbox" className={FiltersCss.checkbox} onClick={changeCurrentAvailability} checked={item.currentAvailability}/>
                            <h2 className={FiltersCss.text_check}>Показать товары которых нет в наличии</h2>
                        </div>
                        <div className={FiltersCss.scales}>
                            {scales.map(scale => <div className={FiltersCss.scale}>
                                    <input type="checkbox" onClick={() => currentScale(scale)} className={FiltersCss.checkbox}
                                           checked={props.currentScale !== null ? props.currentScale.id === scale.id : false}/>
                                    <h2 key={scale.id} className={FiltersCss.scale_text}>{scale.value}</h2>
                            </div>
                            )}
                        </div>
                        <div className={FiltersCss.help_bar + ' ' + FiltersCss.type_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                            <div className={FiltersCss.bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                <h2 className={FiltersCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Категория</h2>
                            </div>
                            <div className={FiltersCss.dropdown_help}>
                                <div className={FiltersCss.dropdown_list + ' ' + FiltersCss.type_list + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <div className={FiltersCss.dropdown_items}>
                                        {item.categories.map(category =>
                                            <button className={FiltersCss.bar_list_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                                    onClick={() => {
                                                        if (category !== currentCategoryId) {
                                                            item.setCurrentDownCategory(-1)
                                                        }
                                                        item.setCurrentCategory(category.id)
                                                        setCategoryId(category.id)
                                                    }}>
                                                {category.name}
                                            </button>
                                        )}
                                    </div>
                                    <button onClick={() => {item.setCurrentDownCategory(-1); item.setCurrentCategory(-1); setCategoryId(-1)}}
                                            className={FiltersCss.clean + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        Очистить
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={FiltersCss.help_bar + ' ' + FiltersCss.brand_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                            <div className={FiltersCss.bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                <h2 className={FiltersCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Подкатегория</h2>
                            </div>
                            <div className={FiltersCss.dropdown_help}>
                                <div className={FiltersCss.dropdown_list + ' ' + FiltersCss.brand_list + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <div className={FiltersCss.dropdown_items}>
                                        {drawCategories.map(categoryDown =>
                                            <button className={FiltersCss.bar_list_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                                    onClick={() => {item.setCurrentDownCategory(categoryDown.id)
                                                    }}>
                                                {categoryDown.name}
                                            </button>
                                        )}
                                    </div>
                                    <button onClick={() => item.setCurrentDownCategory(-1)}
                                            className={FiltersCss.clean + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        Очистить
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={FiltersCss.help_bar + ' ' + FiltersCss.model_bar + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>
                            <div className={FiltersCss.bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                <h2 className={FiltersCss.name_bar + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Бренд</h2>
                            </div>
                            <div className={FiltersCss.dropdown_help}>
                                <div className={FiltersCss.dropdown_list + ' ' + FiltersCss.model_list + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    <div className={FiltersCss.dropdown_items}>
                                        {item.brands.map(brand =>
                                            <button className={FiltersCss.bar_list_item + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                                    onClick={() => {item.setCurrentBrand(brand.id)}
                                                    }>
                                                {brand.name}
                                            </button>
                                        )}
                                    </div>
                                    <button onClick={() => item.setCurrentBrand(-1)}
                                            className={FiltersCss.clean + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        Очистить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Filters;