import React, {useContext, useEffect, useState} from 'react';
import ChangeCategoryCss from "../../css/admin/ChangeCategory.module.css"
import Footer from "../../components/Footer";
import {Context} from "../../index";
import {changeCategoryName, deleteCategory, fetchCategories} from "../../http/API/categoryAPI";
import Alert from "../../components/Alert";
import {changeScale, deleteScale, fetchScales} from "../../http/API/scaleAPI";

const ChangeScale = () => {

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const [value, setValue] = useState('')
    const [currentScale, setCurrentScale] = useState(null)

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [scales, setScales] = useState([])

    useEffect(() => {
        fetchScales().then(data => {
            setScales(data)
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
        if (currentScale !== null && value) {
            changeScale(role, value, currentScale.id).then(() => {
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

    const deleteCurrentCategory = () => {
        if (currentScale !== null) {
            deleteScale(role, currentScale.id).then(data => {
                if (data === 'Удалено') {
                    setMessage('Удалено')
                    setStyle('primary')
                } else {
                    setMessage('Ошибка')
                    setStyle('danger')
                }
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
            <div className="category-block">
                <div className="container">
                    <div className="row">
                        <h2 className={ChangeCategoryCss.select_text}>Выберете масштаб</h2>
                        <div className={ChangeCategoryCss.left + ' col-xxl-6 offset-xxl-0 col-xl-6 offset-xl-0 col-lg-6 offset-lg-0 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-10 offset-1'}>
                            {scales.map(scale =>
                                <h2 onClick={() => setCurrentScale(scale)} className={ChangeCategoryCss.name} key={scale.id}>{scale.value}</h2>
                            )}
                        </div>
                        <div className={ChangeCategoryCss.right + ' col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-1 col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-5 offset-sm-1 col-10 offset-1'}>
                            <div className="row">
                                <input
                                    value={value}
                                    onChange={(e) => {setValue(e.target.value)}}
                                    type="text" className={ChangeCategoryCss.input} placeholder="Введите название"/>
                                <button onClick={() => saveName()}
                                    className={ChangeCategoryCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                                </button>
                                {currentScale !== null ?
                                    <h2 className={ChangeCategoryCss.select_name}>{currentScale.value}</h2>
                                    :
                                    <h2 className={ChangeCategoryCss.select_name}>Не выбрано</h2>
                                }
                                <button onClick={() => deleteCurrentCategory()}
                                    className={ChangeCategoryCss.delete + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Удалить
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

export default ChangeScale;