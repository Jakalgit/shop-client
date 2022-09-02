import React, {useContext, useEffect, useState} from 'react';
import Footer from "../../components/Footer";
import {Context} from "../../index";
import {changeNameCategoryDown, deleteCategoryDown, fetchDownCategories} from "../../http/API/downCategoryAPI";
import {fetchCategories} from "../../http/API/categoryAPI"
import styleCss from "../../css/admin/ChangeDownCategory.module.css"
import Alert from "../../components/Alert";

const ChangeDownCategory = () => {

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const [name, setName] = useState('')

    const [categories, setCategories] = useState([])
    const [downCategories, setDownCategories] = useState([])

    const [currentCategory, setCurrentCategory] = useState(null)
    const [currentCategoryDown, setCurrentCategoryDown] = useState(null)

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    useEffect(() => {
        fetchCategories().then(data => {
            setCategories(data)
            fetchDownCategories().then(data => {
                setDownCategories(data)
            })
        })
    }, [start])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    const saveName = () => {
        if (currentCategory && currentCategoryDown && name) {
            changeNameCategoryDown(role, name, currentCategoryDown.id).then(() => {
                setMessage('Сохранено')
                setStyle('primary')
                setStart(true)
            })
        } else {
            setMessage('Ошибка')
            setStyle('danger')
            setStart(true)
        }
    }

    const deleteCurrentDownCategory = () => {
        if (currentCategory && currentCategoryDown) {
            deleteCategoryDown(role, currentCategoryDown.id).then(data => {
                if (data === 'Удалено') {
                    setMessage('Удалено')
                    setStyle('primary')
                } else {
                    setMessage('Ошибка')
                    setStyle('danger')
                }
                setCurrentCategoryDown(null)
                setStart(true)
            })
        } else {
            setMessage('Ошибка')
            setStyle('danger')
            setStart(true)
        }
    }

    const updateStart = (value) => {
        setStart(value)
    }

    return (
        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <div className="downcategory-block">
                <div className="container">
                    <div className="row">
                        <h2 className={styleCss.select_text}>Выберете категорию</h2>
                        <div className='left col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                            <div className="row">
                                <h2 className={styleCss.head_name}>Категория</h2>
                                <div className={styleCss.list + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1'}>
                                    {categories.map(category =>
                                        <h2 onClick={() => setCurrentCategory(category)} className={styleCss.name}>{category.name}</h2>
                                    )}
                                </div>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className={styleCss.input + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1'}
                                    placeholder="Введите название"/>
                                {currentCategoryDown !== null ?
                                    <h2 className={styleCss.select_name + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1'}>{currentCategoryDown.name}</h2>
                                    :
                                    <h2 className={styleCss.select_name + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1'}>Не выбрано</h2>
                                }
                            </div>
                        </div>
                        <div className='right col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                            <div className="row">
                                <h2 className={styleCss.head_name}>Подкатегория</h2>
                                <div className={styleCss.list + ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1'}>
                                    {currentCategory !== null ?
                                        <div>
                                            {downCategories.map(downCategory => {
                                                if (downCategory.categoryId === currentCategory.id) {
                                                    return <h2 onClick={() => setCurrentCategoryDown(downCategory)} className={styleCss.name}>{downCategory.name}</h2>
                                                }
                                            })}
                                        </div>
                                        :
                                        <div></div>
                                    }
                                </div>
                                <button onClick={() => saveName()}
                                    className={styleCss.save + ' col-xxl-4 offset-xxl-1 col-xl-4 offset-xl-1 col-lg-4 offset-lg-1 col-md-4 offset-md-1 col-sm-4 offset-sm-1'}>Сохранить
                                </button>
                                <button onClick={() => deleteCurrentDownCategory()}
                                    className={styleCss.delete + ' col-xxl-4 offset-xxl-2 col-xl-4 offset-xl-2 col-lg-4 offset-lg-2 col-md-4 offset-md-2 col-sm-4 offset-sm-2'}>Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChangeDownCategory;