import React, {useContext, useEffect, useState} from 'react';
import CreateBrandCss from '../../css/admin/CreateBrand.module.css'
import {Context} from "../../index";
import {createBrand, fetchBrands} from "../../http/API/brandAPI";
import {Spinner} from "react-bootstrap";
import ModalWindow from "../../components/ModalWindow";
import {observer} from "mobx-react-lite";

const CreateBrand = observer(() => {

    const [loading, setLoading] = useState(true)
    const {item} = useContext(Context)
    const [value, setValue] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')

    const [listBrands, setListBrands] = useState(item.brands)

    useEffect(() => {
        fetchBrands().then(data => item.setBrands(data)).finally(() => {
            setLoading(false)
            window.localStorage.setItem('listBrands', JSON.stringify(item.brands))
        })
    }, [listBrands])

    useEffect(() => {
        setListBrands((JSON.parse(window.localStorage.getItem('listBrands'))))
    }, [])



    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const AddBrand = () => {
        let flag = true
        listBrands.map(brand => {
            if (brand.name === value) {
                flag = false
            }
        })
        if (value && flag) {
            createBrand({value: value, role}).then(data => {setValue('')})
            let smList = listBrands.slice()
            smList.push({id: smList.length, name: value})
            setListBrands(smList)
        } else {
            if (!value) {
                setModalText('Название не может быть пустым')
            }

            if (!flag) {
                setModalText('Такое название уже существует')
            }
            setShowModal(true)
        }
    }

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <section className={CreateBrandCss.brand_section + ' brand-section'}>
            <div className="container">
                <div className="row">
                    <div className={CreateBrandCss.create_brand + ' create-brand'}>
                        <div className="row">
                            <div className={CreateBrandCss.brand_list + ' brand-list col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'}>
                                <h2 className={CreateBrandCss.brand_list_text+ ' brand-list-text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Существующие
                                    бренды</h2>
                                <div
                                    className={CreateBrandCss.list + ' list col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    {listBrands.map(brand =>
                                        <h2 className={CreateBrandCss.list_item + ' list-item col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} key={brand.id}>{brand.name}</h2>
                                    )}
                                </div>
                            </div>
                            <div className={CreateBrandCss.add_brand + ' add-brand col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'}>
                                <h2 className={CreateBrandCss.add_text + ' add-text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Добавление</h2>
                                <input type="text"
                                       onChange={(e) => {setValue(e.target.value)}}
                                       className={CreateBrandCss.input_brand + ' input-brand col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}
                                       placeholder="Введите назване"/>
                                    <button className={CreateBrandCss.button_add + ' button-add col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}
                                        onClick={AddBrand}>
                                        Добавить бренд
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalWindow show={showModal} text={modalText} onHide={() => setShowModal(false)}/>
        </section>
    );
});

export default CreateBrand;