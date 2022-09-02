import React, {useContext, useEffect, useState} from 'react';
import style_css from '../../css/admin/CreateItem.module.css'
import {Context} from "../../index";
import {createItem} from "../../http/API/itemAPI"
import {createItemColor} from "../../http/API/colorAPI"
import {createItemInfo} from "../../http/API/itemAPI"
import {fetchBrands} from "../../http/API/brandAPI"
import {fetchCategories} from "../../http/API/categoryAPI"
import {fetchDownCategories} from "../../http/API/downCategoryAPI";
import {Spinner} from "react-bootstrap";
import ModalWindow from "../../components/ModalWindow";
import Footer from "../../components/Footer";
import {observer} from "mobx-react-lite";
import {fetchScales} from "../../http/API/scaleAPI";

const CreateItem = observer(() => {

    const {item} = useContext(Context)

    const [loading, setLoading] = useState(true)

    const [currentCategory, setCurrentCategory] = useState(-1)
    const [currentBrand, setCurrentBrand] = useState(-1)
    const [currentDownCategory, setCurrentDownCategory] = useState(-1)
    const [nameItem, setNameItem] = useState('')
    const [priceItem, setPriceItem] = useState('')
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [availability, setAvailability] = useState(true)
    const [visibility, setVisibility] = useState(true)
    const [discountFlag, setDiscountFlag] = useState(false)
    const [oldPrice, setOldPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [isNew, setIsNew] = useState(true)
    const [scales, setScales] = useState([])

    const [colors, setColors] = useState([])
    const [colorNumber, setColorNumber] = useState('')
    const [currentColor, setCurrentColor] = useState(null)
    const [currentScale, setCurrentScale] = useState({})

    const [info, setInfo] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')

    const [drawCategories, setDrawCategories] = useState([])

    useEffect(() => {
        fetchCategories().then(data => {
            item.setCategories(data)
            fetchDownCategories().then(data => {
                item.setDownCategories(data)
                fetchBrands().then(data => {
                    item.setBrands(data)
                    fetchScales().then(data => {
                        setScales(data)
                        setLoading(false)
                    })
                })
            })
        })
    }, [])

    useEffect(() => {
        drawCategory()
    }, [currentCategory])

    useEffect(() => {
        if (colorNumber) {
            colors.map(color => {
                if (color.number === colorNumber) {
                    setCurrentColor(color)
                }
            })
        }
    }, [colors, colorNumber])

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const addColor = () => {
        setColors([...colors, {number: String(Date.now()) ,img1: null, img2: null, img3: null, img4: null}])
    }

    const deleteColor = () => {
        setColors(colors.filter(el => el.number !== currentColor.number))
        setCurrentColor(null)
    }

    const addInfo = () => {
        setInfo([...info, {info: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const selectImg_1 = (e) => {
        setColors(colors.map(color => color.number === colorNumber ? {...color, 'img1' : e.target.files[0]} : color))
    }

    const removeImg_1 = () => {
        setColors(colors.map(color => color.number === colorNumber ? {...color, 'img1' : null} : color))
    }

    const selectImg_2 = (e) => {
        setColors(colors.map(color => color.number === colorNumber ? {...color, 'img2' : e.target.files[0]} : color))
    }

    const removeImg_2 = () => {
        setColors(colors.map(color => color.number === colorNumber ? {...color, 'img2' : null} : color))
    }

    const selectImg_3 = (e) => {
        setColors(colors.map(color => color.number === colorNumber ? {...color, 'img3' : e.target.files[0]} : color))
    }

    const removeImg_3 = () => {
        setColors(colors.map(color => color.number === colorNumber ? {...color, 'img3' : null} : color))
    }

    const selectImg_4 = (e) => {
        setColors(colors.map(color => color.number === colorNumber ? {...color, 'img4' : e.target.files[0]} : color))
    }

    const removeImg_4 = () => {
        setColors(colors.map(color => color.number === colorNumber ? {...color, 'img4' : null} : color))
    }

    const changeInfo = (value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, 'info' : value} : i))
    }

    const addItem = () => {
        let colors_flag = true
        if (colors.length !== 0) {
            colors.map(color => {
                if (color.img1 === null || color.img2 === null || color.img3 === null || color.img4 === null) {
                    colors_flag = false
                }
            })
        } else {
            colors_flag = false

        }

        let disc
        if (discountFlag) {
            disc = (discount && oldPrice);
        } else {
            disc = true
        }

        if ((currentCategory !== -1) && (currentDownCategory !== -1) && (currentBrand !== -1) && nameItem && info && length &&
            width && height && weight && priceItem && disc && colors_flag && currentScale) {
            const formData = new FormData()

            if (!discountFlag) {
                setDiscount('0')
                setOldPrice('0')
            }

            formData.append('name', nameItem)
            formData.append('price', priceItem)
            formData.append('categoryId', `${currentCategory}`)
            formData.append('categoryDownId', `${currentDownCategory}`)
            formData.append('brandId', `${currentBrand}`)
            formData.append('length', `${length}`)
            formData.append('width', `${width}`)
            formData.append('height', `${height}`)
            formData.append('weight', `${weight}`)
            formData.append('scaleId', `${currentScale.id}`)
            formData.append('availability', `${availability}`)
            formData.append('visibility', `${visibility}`)
            formData.append('oldPrice', `${oldPrice}`)
            formData.append('discount', `${discount}`)
            formData.append('discountFlag', `${discountFlag}`)
            formData.append('new_item', `${isNew}`)
            createItem({formData, role}).then(data => {
                setPriceItem('')
                setNameItem('')
                setLength('')
                setWidth('')
                setHeight('')
                setWeight('')
                setOldPrice('')
                setDiscount('')

                info.map(i => {
                    createItemInfo(role, i.info, data.id).then(() => {})
                })

                setInfo([])

                colors.map(color => {
                    const formDataColors = new FormData()
                    let itemId = String(data.id)
                    formDataColors.append('itemId', `${itemId}`)
                    formDataColors.append('img_1', color.img1)
                    formDataColors.append('img_2', color.img2)
                    formDataColors.append('img_3', color.img3)
                    formDataColors.append('img_4', color.img4)
                    createItemColor(formDataColors, role).then(() => {})
                })
                setColorNumber('')
                setColors([])
                setCurrentColor(null)
            }).finally(() => {
                setModalText('Товар добавлен')
                setShowModal(true)
            })
        } else {
            setModalText('Заполните все поля')
            setShowModal(true)
        }
    }

    const drawCategory = () => {

        setDrawCategories([])

        if (item.downCategories && currentCategory !== -1) {
            let mas = []
            item.downCategories.map(downCategory => {
                if (downCategory.categoryId === currentCategory ) {
                    mas.push(downCategory)
                }
            })
            setDrawCategories(mas)
        }
    }

    if (loading) {
        return <Spinner className={style_css.empty} animation={"grow"} />
    }

    return (
        <div>
            <div className={style_css.param_item}>
                <div className="container">
                    <div className="row">
                        <div className={style_css.list_block + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-10 offset-1'}>
                            <h2 className={style_css.list_name}>Категория</h2>
                            <div className={style_css.list}>
                                {item.categories.map(category =>
                                    <div>
                                        {currentCategory.id === category.id ?
                                            <h2 className={style_css.name + ' ' + style_css.name_check} onClick={() => setCurrentCategory(category.id)} key={category.id}>{category.name}</h2>
                                            :
                                            <h2 className={style_css.name} onClick={() => setCurrentCategory(category.id)} key={category.id}>{category.name}</h2>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={style_css.list_block + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-10 offset-1'}>
                            <h2 className={style_css.list_name}>Подкатегория</h2>
                            <div className={style_css.list}>
                                {drawCategories.map(downCategory =>
                                    <div>
                                        {currentDownCategory.id === downCategory.id ?
                                            <h2 className={style_css.name + ' ' + style_css.name_check} onClick={() => setCurrentDownCategory(downCategory.id)} key={downCategory.id}>{downCategory.name}</h2>
                                            :
                                            <h2 className={style_css.name} onClick={() => setCurrentDownCategory(downCategory.id)} key={downCategory.id}>{downCategory.name}</h2>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={style_css.list_block + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-10 offset-1'}>
                            <h2 className={style_css.list_name}>Бренд</h2>
                            <div className={style_css.list}>
                                {item.brands.map(brand =>
                                    <div>
                                        {currentBrand.id === brand.id ?
                                            <h2 className={style_css.name + ' ' + style_css.name_check} onClick={() => setCurrentBrand(brand.id)} key={brand.id}>{brand.name}</h2>
                                            :
                                            <h2 className={style_css.name} onClick={() => setCurrentBrand(brand.id)} key={brand.id}>{brand.name}</h2>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.sub_line}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   value={nameItem} onChange={e => setNameItem(e.target.value)} placeholder="Название" />
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <input type="number" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   value={priceItem} onChange={e => setPriceItem(e.target.value)} placeholder="Цена" />
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                            <button onClick={addColor}
                                    className={style_css.button + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Добавить цвет
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.color}>
                <div className="container">
                    <div className="row">
                        <div className={style_css.icons + ' col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12'}>
                            {colors.length !== 0 ?
                                <div>
                                    {colors.map(color =>
                                        <div style={{display: 'inline-block'}} onClick={() => setColorNumber(color.number)} className={style_css.icon}/>
                                    )}
                                </div>
                                :
                                <div/>
                            }
                        </div>
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-6 offset-sm-3 col-6 offset-3">
                            <button onClick={deleteColor}
                                className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Удалить цвет
                            </button>
                        </div>
                        {currentColor && colorNumber ?
                            <div className="row">
                                <div style={{display: 'inline-block'}} className={style_css.images + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                                    <button onClick={removeImg_1} className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        Удалить
                                    </button>
                                    <label className={style_css.input_file}>
                                        <input onChange={e => {selectImg_1(e)}} type="file" className={style_css.file}/>
                                        <h2 className={style_css.file_text}>{currentColor.img1 !== null ? currentColor.img1.name : 'Выберете изображение 1'}</h2>
                                    </label>
                                </div>
                                <div style={{display: 'inline-block'}} className={style_css.images + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                                    <button onClick={removeImg_2} className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        Удалить
                                    </button>
                                    <label className={style_css.input_file}>
                                        <input onChange={e => {selectImg_2(e)}} type="file" className={style_css.file}/>
                                        <h2 className={style_css.file_text}>{currentColor.img2 !== null ? currentColor.img2.name : 'Выберете изображение 2'}</h2>
                                    </label>
                                </div>
                                <div style={{display: 'inline-block'}} className={style_css.images + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                                    <button onClick={removeImg_3} className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        Удалить
                                    </button>
                                    <label className={style_css.input_file}>
                                        <input onChange={e => {selectImg_3(e)}} type="file" className={style_css.file}/>
                                        <h2 className={style_css.file_text}>{currentColor.img3 !== null ? currentColor.img3.name : 'Выберете изображение 3'}</h2>
                                    </label>
                                </div>
                                <div style={{display: 'inline-block'}} className={style_css.images + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                                    <button onClick={removeImg_4} className={style_css.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        Удалить
                                    </button>
                                    <label className={style_css.input_file}>
                                        <input onChange={e => {selectImg_4(e)}} type="file" className={style_css.file}/>
                                        <h2 className={style_css.file_text}>{currentColor.img4 !== null ? currentColor.img4.name : 'Выберете изображение 4'}</h2>
                                    </label>
                                </div>
                            </div>
                            :
                            <div/>
                        }
                    </div>
                </div>
            </div>
            <div className={style_css.checkboxes}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-0">
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="stock"
                                       onClick={() => {
                                           setAvailability(true)
                                       }} checked={availability} />
                                <h2 className={style_css.line_text}>В наличии</h2>
                            </div>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="stock"
                                       onClick={() => {
                                           setAvailability(false)
                                       }} checked={!availability} />
                                <h2 className={style_css.line_text}>Нет в наличии</h2>
                            </div>
                        </div>
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-0">
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="visibility"
                                       onClick={() => {
                                           setVisibility(true)
                                       }} checked={visibility}/>
                                <h2 className={style_css.line_text}>Видимый</h2>
                            </div>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="visibility"
                                       onClick={() => {
                                           setVisibility(false)
                                       }} checked={!visibility}/>
                                <h2 className={style_css.line_text}>Невидимый</h2>
                            </div>
                        </div>
                        <div className={style_css.check_mt + ' col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-3'}>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-4'}>
                                <input type="radio" className={style_css.radio} name="new"
                                       onClick={() => {
                                           setIsNew(true)
                                       }} checked={isNew}/>
                                <h2 className={style_css.line_text}>Новинка</h2>
                            </div>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-4'}>
                                <input type="radio" className={style_css.radio} name="new"
                                       onClick={() => {
                                           setIsNew(false)
                                       }} checked={!isNew}/>
                                <h2 className={style_css.line_text}>Не новинка</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.proportions}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Длина(см)"
                                   value={length} onChange={e => setLength(e.target.value)}/>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Ширина(см)"
                                   value={width} onChange={e => setWidth(e.target.value)}/>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Высота(см)"
                                   value={height} onChange={e => setHeight(e.target.value)}/>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6">
                            <input type="text" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Вес(кг)"
                                   value={weight} onChange={e => setWeight(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.discount}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-3">
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="discount"
                                       onClick={() => {
                                           setDiscountFlag(true)
                                       }} checked={discountFlag}/>
                                    <h2 className={style_css.line_text}>Со скидкой</h2>
                            </div>
                            <div className={style_css.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input type="radio" className={style_css.radio} name="discount"
                                       onClick={() => {
                                           setDiscountFlag(false)
                                       }} checked={!discountFlag}/>
                                    <h2 className={style_css.line_text}>Без скидки</h2>
                            </div>
                        </div>
                        {discountFlag ?
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                                <input type="number" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Старая цена"
                                       value={oldPrice} onChange={e => setOldPrice(e.target.value)}/>
                            </div>
                            :
                            <div/>
                        }
                        {discountFlag ?
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                                <input type="number" className={style_css.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Скидка %"
                                       value={discount} onChange={e => setDiscount(e.target.value)}/>
                            </div>
                            :
                            <div/>
                        }
                    </div>
                </div>
            </div>
            <div className={style_css.scale}>
                <div className="container">
                    <div className="row">
                        <div className={style_css.flex}>
                            <div className={style_css.list + ' col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-8 offset-2'}>
                                {scales.map(scale =>
                                    <div>
                                        {currentScale.id === scale.id ?
                                            <h2 onClick={() => setCurrentScale(scale)} className={style_css.name + ' ' + style_css.name_check} key={scale.id}>{scale.value}</h2>
                                            :
                                            <h2 onClick={() => setCurrentScale(scale)} className={style_css.name} key={scale.id}>{scale.value}</h2>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style_css.information}>
                <div className="container">
                    <div className="row">
                        <button onClick={addInfo}
                            className={style_css.button + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-8 offset-2'}>
                            Добавить информацию
                        </button>
                        <div className="list-info">
                            {info.map(i =>
                                <div key={i.number} className="description">
                                <textarea key={i.number} className={style_css.des_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} placeholder="Введите описание"
                                          onChange={(e) => changeInfo(e.target.value, i.number)} value={i.info}/>
                                    <button key={i.number} onClick={() => removeInfo(i.number)}
                                        className={style_css.mt + ' ' + style_css.delete + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'}>Удалить
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <button onClick={addItem}
                        className={style_css.add_item + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-8 offset-2'}>
                            Добавить товар
                    </button>
                </div>
            </div>
            <Footer />
            <ModalWindow show={showModal} text={modalText} onHide={() => setShowModal(false)}/>
        </div>
    );
});

export default CreateItem;