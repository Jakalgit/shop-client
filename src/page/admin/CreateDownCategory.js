import React, {useContext, useEffect, useState} from 'react';
import DownCategoryCss from '../../css/admin/CreateDownCategory.module.css'
import {Context} from "../../index";
import {createDownCategory, fetchDownCategories} from "../../http/API/downCategoryAPI";
import {fetchCategories} from "../../http/API/categoryAPI"
import {Spinner} from "react-bootstrap";
import ModalWindow from "../../components/ModalWindow";
import {observer} from "mobx-react-lite";

const CreateDownCategory = observer(() => {

    const [loading, setLoading] = useState(true)
    const {item} = useContext(Context)
    const [value, setValue] = useState('')
    const [currentId, setCurrentId] = useState(-1)

    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')

    useEffect(() => {
        fetchCategories().then(data => item.setCategories(data)).finally(() => setLoading(false))
        fetchDownCategories().then(data => item.setDownCategories(data)).finally(() => {setLoading(false); setListDownCategories(item.downCategories)})

    }, [])

    const [listDownCategories, setListDownCategories] = useState([])
    const [drawCategories, setDrawCategories] = useState([])

    useEffect(() => {
        setListDownCategories((JSON.parse(window.localStorage.getItem('listDownCategories'))))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('listDownCategories', JSON.stringify(listDownCategories))
    }, [listDownCategories])

    const {user} = useContext(Context)
    let role
    if (user.isAdmin) {
        role = 'ADMIN'
    } else {
        role = 'USER'
    }

    useEffect(() => {
        drawCategory()
    }, [currentId])

    useEffect(() => {
        drawCategory()
    }, [listDownCategories])

    const drawCategory = () => {

        setDrawCategories([])

        if (listDownCategories && currentId !== -1) {
            let mas = []
            listDownCategories.map(downCategory => {
                if (downCategory.categoryId === currentId ) {
                    mas.push(downCategory)
                }
            })
            setDrawCategories(mas)
        }
    }

    const AddCategoryDown = () => {
        let flag = true

        listDownCategories.map(downCategory => {
            if (downCategory.name === value) {
                flag = false
            }
        })

        if (value && flag && currentId !== -1) {
            createDownCategory({value: value, role, categoryId: currentId}).then(data => {
                setValue('')
            })
            let smList = listDownCategories.slice()
            smList.push({id: smList.length, name: value, categoryId: currentId})
            setListDownCategories(smList)
        } else {
            if (!value) {
                setModalText('Название не может быть пустым')
            }

            if (!flag) {
                setModalText('Такое название уже существует')
            }

            if (currentId === -1) {
                setModalText('Выберите категорию')
            }
            setShowModal(true)
        }
    }

    if (loading) {
        return <Spinner animation={"grow"} className={DownCategoryCss.spinner} />
    }

    return (
        <section className={DownCategoryCss.downcategory_section+ ' downcategory-section'}>
            <div className="container">
                <div className="row">
                    <div className={DownCategoryCss.downcategory_block + ' downcategory-block'}>
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                <h2 className={DownCategoryCss.select_text + ' select-text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Категории</h2>
                                <div className={DownCategoryCss.select_list + ' select-list col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                    {item.categories.map(category =>
                                        <button className={DownCategoryCss.select_item + ' select-item col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} key={category.id}
                                                onClick={() => {
                                                    let id = category.id
                                                    setCurrentId(id)
                                                }}>
                                            {category.name}
                                        </button>
                                    )}
                                </div>
                                <h2 className={DownCategoryCss.info_text + ' info-text col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>Каждая
                                    подкатегория принадлежит своей категории, категория может иметь несколько
                                    подкатегорий. В левом окне выберете категорию для вашей подкатегории, в правом окне
                                    отображаются подкатегории выбранной категории.</h2>
                            </div>
                            <div className="downcategory-exist col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                <div className="row">
                                    <h2 className={DownCategoryCss.exist_text + ' exist-text col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Подкатегории</h2>
                                    <div className={DownCategoryCss.exist_list + ' exist-list'}>
                                        {drawCategories.map(drawCategory =>
                                            <h2 className={DownCategoryCss.exist_item + ' exist-item col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'} key={drawCategory.id}>
                                                {drawCategory.name}
                                            </h2>
                                        )}
                                    </div>
                                    <input type="text"
                                           value={value}
                                           onChange={(e) => {setValue(e.target.value)}}
                                           className={DownCategoryCss.input_downcategory + ' input-downcategory col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'}
                                           placeholder="Введите название"/>
                                    <button className={DownCategoryCss.button_add + ' button-add col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-1 col-lg-5 offset-lg-1 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-12 offset-0'}
                                        onClick={AddCategoryDown}>
                                        Добавить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalWindow show={showModal} text={modalText} onHide={() => setShowModal(false)}/>
        </section>
    );
});

export default CreateDownCategory;