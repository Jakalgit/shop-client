import React, {useContext, useEffect, useState} from 'react';
import Alert from "../../components/Alert";
import ChangeCategoryCss from "../../css/admin/ChangeCategory.module.css";
import Footer from "../../components/Footer";
import {Context} from "../../index";
import {changeNameBrand, deleteBrand, fetchBrands} from "../../http/API/brandAPI";

const ChangeBrand = () => {

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const [name, setName] = useState('')
    const [currentBrand, setCurrentBrand] = useState(null)

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [brands, setBrands] = useState([])

    useEffect(() => {
        fetchBrands().then(data => {
            setBrands(data)
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
        if (currentBrand && name) {
            changeNameBrand(role, name, currentBrand.id).then(() => {
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

    const deleteCurrentBrand = () => {
        if (currentBrand) {
            deleteBrand(role, currentBrand.id).then(data => {
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
                        <h2 className={ChangeCategoryCss.select_text}>Выберете брэнд</h2>
                        <div className={ChangeCategoryCss.left + ' col-xxl-6 offset-xxl-0 col-xl-6 offset-xl-0 col-lg-6 offset-lg-0 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-10 offset-1'}>
                            {brands.map(brand =>
                                <h2 onClick={() => setCurrentBrand(brand)} className={ChangeCategoryCss.name}>{brand.name}</h2>
                            )}
                        </div>
                        <div className={ChangeCategoryCss.right + ' col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-1 col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-5 offset-sm-1 col-10 offset-1'}>
                            <div className="row">
                                <input
                                    value={name}
                                    onChange={(e) => {setName(e.target.value)}}
                                    type="text" className={ChangeCategoryCss.input} placeholder="Введите название"/>
                                <button onClick={() => saveName()}
                                        className={ChangeCategoryCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                                </button>
                                {currentBrand !== null ?
                                    <h2 className={ChangeCategoryCss.select_name}>{currentBrand.name}</h2>
                                    :
                                    <h2 className={ChangeCategoryCss.select_name}>Не выбрано</h2>
                                }
                                <button onClick={() => deleteCurrentBrand()}
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

export default ChangeBrand;