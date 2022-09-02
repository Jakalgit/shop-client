import React, {useContext, useEffect, useState} from 'react';
import CategoryCss from '../../css/admin/CreateCategory.module.css'
import {Context} from "../../index";
import {createCategory, fetchCategories} from "../../http/API/categoryAPI";
import {Spinner} from "react-bootstrap";
import ModalWindow from "../../components/ModalWindow";
import {observer} from "mobx-react-lite";

const CreateCategory = observer(() => {

    const [loading, setLoading] = useState(true)
    const {item} = useContext(Context)
    const [value, setValue] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')

    const [listCategories, setListCategories] = useState(item.categories)

    useEffect(() => {
        fetchCategories().then(data => item.setCategories(data)).finally(() => {
            setLoading(false)
            window.localStorage.setItem('listCategories', JSON.stringify(item.categories))
        })
    }, [listCategories])

    useEffect(() => {
        setListCategories((JSON.parse(window.localStorage.getItem('listCategories'))))
    }, [])

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    const AddCategory = () => {
        let flag = true
        listCategories.map(category => {
            if (category.name === value) {
                flag = false
            }
        })
        if (value && flag) {
            createCategory({value, role}).then(data => {
                setValue('')
            })
            let smList = listCategories.slice()
            smList.push({id: smList.length, name: value})
            setListCategories(smList)
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
        <section className={CategoryCss.category_section + ' category-section'}>
            <div className="container">
                <div className="row">
                    <div className={CategoryCss.create_category + ' create-category'}>
                        <div className="row">
                            <div className={CategoryCss.category_list + ' category-list col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'}>
                                <h2 className={CategoryCss.category_list_text + ' category-list-text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    Существующие категории
                                </h2>
                                <div
                                    className={CategoryCss.list + ' list col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    {listCategories.map(category =>
                                        <h2 className={CategoryCss.list_item + ' list-item col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} key={category.id}>{category.name}</h2>
                                    )}
                                </div>
                            </div>
                            <div className={CategoryCss.add_category + ' add-category col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'}>
                                <h2 className={CategoryCss.add_text + ' add-text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Добавление</h2>
                                <input type="text"
                                       value={value}
                                       onChange={e => setValue(e.target.value)}
                                       className={CategoryCss.input_category + ' input-category col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}
                                       placeholder="Введите назване"/>
                                    <button className={CategoryCss.button_add + ' button-add col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}
                                        onClick={AddCategory}>
                                        Добавить категорию
                                    </button>
                                    <h2 className={CategoryCss.list_item + ' list-item col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-8 offset-2'}>
                                        Название категории следует писать с большой буквы
                                    </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalWindow show={showModal} text={modalText} onHide={() => setShowModal(false)}/>
        </section>
    );
});

export default CreateCategory;