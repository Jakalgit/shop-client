import React, {useContext, useEffect, useState} from 'react';
import CreateOrderCss from '../css/CreateOrder.module.css'
import Footer from "../components/Footer";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import ModalWindow from "../components/ModalWindow";
import {CHECKORDER_ROUTE, CREATEORDER_ROUTE} from "../utils/consts";
import {Helmet} from "react-helmet";
import {Modal, Spinner} from "react-bootstrap";
import {fetchOneItem} from "../http/API/itemAPI";
import general from "../css/General.module.css";
import {Fade, Zoom} from "react-reveal";

window.typeCDEK = ''
window.postId = ''
window.address = ''
window.price = ''
window.goods = []

const CreateOrder = () => {

    const {user} = useContext(Context)
    const {item} = useContext(Context)
    const {order} = useContext(Context)

    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [showMap, setShowMap] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [secondName, setSecondName] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const [index, setIndex] = useState('')
    const [street, setStreet] = useState('')
    const [house, setHouse] = useState('')
    const [flat, setFlat] = useState('')

    const [typePay, setTypePay] = useState('1')
    const [typeDelivery, setTypeDelivery] = useState('2')

    const [loading, setLoading] = useState(true)

    const [stateGoods, setStateGoods] = useState([{}])
    useEffect(() => {
        let count = item.basketItems.length
        let k = 0
        let mas = []
        item.basketItems.map(item => {
            fetchOneItem(item.itemId).then(data => {
                for (let i = 0; i < item.count; i++) {
                    mas.push({length: Number(data.length), width: Number(data.width), height: Number(data.height), weight: Number(data.weight)})
                }
                k++
                if (count === k) {
                    setStateGoods(mas)
                }
            })
        })
        setLoading(false)
    }, [])

    useEffect(() => {
        window.goods = stateGoods
    }, [stateGoods])

    const clickButton = () => {
        let number = String(Date.now())
        if (typeDelivery) {
            if (typeDelivery === '1') {
                if (firstName && phoneNumber && typePay) {
                    order.setToken(user.user.token)
                    order.setNumber(number)
                    order.setFirstName(firstName)
                    order.setLastName(lastName)
                    order.setSecondName(secondName)
                    order.setPhoneNumber(phoneNumber)
                    order.setEmail(email)
                    order.setPrice('0')
                    order.setTypePay(typePay)
                    order.setTypeDelivery(typeDelivery)
                    navigate(CHECKORDER_ROUTE)
                } else {
                    setShowModal(true)
                }
            }

            if (typeDelivery === '2') {
                if (firstName && phoneNumber && street && house && flat && typePay && typeDelivery) {
                    order.setToken(user.user.token)
                    order.setNumber(number)
                    order.setFirstName(firstName)
                    order.setLastName(lastName)
                    order.setSecondName(secondName)
                    order.setPhoneNumber(phoneNumber)
                    order.setEmail(email)
                    order.setIndex(index)
                    order.setStreet(street)
                    order.setHouse(house)
                    order.setFlat(flat)
                    order.setPrice('300')
                    order.setTypePay(typePay)
                    order.setTypeDelivery(typeDelivery)
                    navigate(CHECKORDER_ROUTE)
                } else {
                    setShowModal(true)
                }
            }

            if (typeDelivery === '3') {
                if (window.typeCDEK === '???? ????????????') {
                    if (firstName && lastName && secondName && phoneNumber && typePay && typeDelivery && window.postId && window.price) {
                        order.setToken(user.user.token)
                        order.setNumber(number)
                        order.setFirstName(firstName)
                        order.setLastName(lastName)
                        order.setSecondName(secondName)
                        order.setPhoneNumber(phoneNumber)
                        order.setEmail(email)
                        order.setIndex(window.postId)
                        order.setStreet('???????????????? ???????? ???? ????????????')
                        order.setHouse('???????????????? ???????? ???? ????????????')
                        order.setFlat('???????????????? ???????? ???? ????????????')
                        order.setPrice(window.price)
                        order.setTypePay(typePay)
                        order.setTypeDelivery(typeDelivery)
                        navigate(CHECKORDER_ROUTE)
                    } else {
                        setShowModal(true)
                    }
                } else if (window.typeCDEK === '???? ??????????') {
                    if (firstName && lastName && secondName && phoneNumber && typePay && typeDelivery && window.address && window.price) {
                        order.setToken(user.user.token)
                        order.setNumber(number)
                        order.setFirstName(firstName)
                        order.setLastName(lastName)
                        order.setSecondName(secondName)
                        order.setPhoneNumber(phoneNumber)
                        order.setEmail(email)
                        order.setIndex('???????????????? ???????? ???? ??????????')
                        order.setStreet(window.address)
                        order.setHouse('???????????????? ???????? ???? ??????????')
                        order.setFlat('???????????????? ???????? ???? ??????????')
                        order.setPrice(window.price)
                        order.setTypePay(typePay)
                        order.setTypeDelivery(typeDelivery)
                        navigate(CHECKORDER_ROUTE)
                    } else {
                        setShowModal(true)
                    }
                } else {
                    setShowModal(true)
                }
            }

        } else {
            setShowModal(true)
        }
    }

    const handleClose = () => setShowMap(false)

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (

        <div>
            {item.basketItems.length !== 0 && stateGoods.length !== 0 ?
                <div>
                    <div className={CreateOrderCss.create_section + ' ' + general.height}>
                        <div className="container">
                            <div className="row">
                                <h2 className={CreateOrderCss.create_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>???????????????????? ????????????</h2>
                                <div className={CreateOrderCss.left_block + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
                                    <div className='name col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                        {typeDelivery === '3' ?
                                            <div className="row">
                                                <Fade cascade>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="*??????????????"
                                                           onChange={(e) => {setLastName(e.target.value)}}/>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="*??????"
                                                           onChange={(e) => {setFirstName(e.target.value)}}/>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="*????????????????"
                                                           onChange={(e) => {setSecondName(e.target.value)}}/>
                                                </Fade>
                                            </div>
                                            :
                                            <div className="row">
                                                <Fade cascade>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="??????????????"
                                                           onChange={(e) => {setLastName(e.target.value)}}/>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="*??????"
                                                           onChange={(e) => {setFirstName(e.target.value)}}/>
                                                    <input type="text"
                                                           className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                           placeholder="????????????????"
                                                           onChange={(e) => {setSecondName(e.target.value)}}/>
                                                </Fade>
                                            </div>
                                        }
                                    </div>
                                    <div className={CreateOrderCss.num_mail + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                        <div className="row">
                                            <Fade cascade>
                                                <input type="text"
                                                       className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                       placeholder="?????????? ????????????????*"
                                                       onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                                                <input type="text"
                                                       className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                       placeholder="?????????????????????? ??????????"
                                                       onChange={(e) => {setEmail(e.target.value)}}/>
                                            </Fade>
                                        </div>
                                    </div>
                                    {typeDelivery === '1' ?
                                        <div>

                                        </div>
                                        :
                                        <div>
                                            {typeDelivery === '2' ?
                                                <div className={CreateOrderCss.address + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                    <div className="row">
                                                        <Fade>
                                                            <input type="text"
                                                                   className={CreateOrderCss.data + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}
                                                                   placeholder="*??????????"
                                                                   onChange={(e) => {setStreet(e.target.value)}}/>
                                                        </Fade>
                                                    </div>
                                                    <div className={CreateOrderCss.address_help + ' row'}>
                                                        <Fade cascade>
                                                            <input type="text" className={CreateOrderCss.data + ' ' + CreateOrderCss.small + ' col-sm-12'}
                                                                   placeholder="*??????"
                                                                   onChange={(e) => {setHouse(e.target.value)}}/>
                                                            <input type="text" className={CreateOrderCss.data + ' ' + CreateOrderCss.small + ' ' + CreateOrderCss.middle + ' col-sm-12'}
                                                                   placeholder="*????????????????"
                                                                   onChange={(e) => {setFlat(e.target.value)}}/>
                                                            <input type="text" className={CreateOrderCss.data + ' ' + CreateOrderCss.small + ' col-sm-12'}
                                                                   placeholder="????????????"
                                                                   onChange={(e) => {setIndex(e.target.value)}}/>
                                                        </Fade>
                                                    </div>
                                                </div>
                                                :
                                                <div className={CreateOrderCss.address + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                    <Fade bottom>
                                                        <button onClick={() => setShowMap(true)}
                                                                className={CreateOrderCss.next + ' ' + CreateOrderCss.mt + ' col-xxl-12 offset-xxl-0 col-xl-12 offset-xl-0 col-lg-12 offset-lg-0 col-md-12 offset-md-0 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                                            ?????????????? ??????????
                                                        </button>
                                                    </Fade>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={CreateOrderCss.right_block + ' col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-1 col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-5 offset-sm-1 col-10 offset-1'}>
                                    <div className="row">
                                        {typeDelivery === '3' ?
                                            <Fade>
                                                <div className='pay col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-6'>
                                                    <h2 className={CreateOrderCss.header_way + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>???????????? ????????????:</h2>
                                                    <div className={CreateOrderCss.way_line + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                        <input type="radio" className={CreateOrderCss.radio} name="pay"
                                                               onClick={() => setTypePay('1')} checked={typePay === '1'}/>
                                                        <h2 className={CreateOrderCss.variant}>???????????? ????????????</h2>
                                                    </div>
                                                    <div className={CreateOrderCss.way_plug}></div>
                                                </div>
                                            </Fade>
                                            :
                                            <Fade>
                                                <div className="pay col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-6">
                                                    <h2 className={CreateOrderCss.header_way + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>???????????? ????????????:</h2>
                                                    <div className={CreateOrderCss.way_line + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                        <input type="radio" className={CreateOrderCss.radio} name="pay"
                                                               onClick={() => setTypePay('1')} checked={typePay === '1'}/>
                                                        <h2 className={CreateOrderCss.variant}>???????????? ????????????</h2>
                                                    </div>
                                                    <div className={CreateOrderCss.way_line + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                                        <input type="radio" className={CreateOrderCss.radio} name="pay"
                                                               onClick={() => setTypePay('2')} checked={typePay === '2'}/>
                                                        <h2 className={CreateOrderCss.variant}>???????????? ?????? ??????????????????</h2>
                                                    </div>
                                                </div>
                                            </Fade>
                                        }
                                        <Fade>
                                            <div className='delivery col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-6'>
                                                <h2 className={CreateOrderCss.header_way + ' ' + CreateOrderCss.margin + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>???????????? ????????????????:</h2>
                                                <div className={CreateOrderCss.way_line}>
                                                    <input type="radio" className={CreateOrderCss.radio} name="address"
                                                           onClick={() => setTypeDelivery('1')}/>
                                                    <h2 className={CreateOrderCss.variant}>??????????????????</h2>
                                                </div>
                                                <h2 className={CreateOrderCss.mini}>?????????? ????????????????????<br/>??. ????????????, ?????????????????????????? ?????????????? ??. 10,
                                                    ??????. 12<br/>????????????: <p className={CreateOrderCss.par}>105082</p></h2>
                                                <div className={CreateOrderCss.way_line}>
                                                    <input type="radio" className={CreateOrderCss.radio} name="address"
                                                           onClick={() => setTypeDelivery('2')}/>
                                                    <h2 className={CreateOrderCss.variant}>???????????????? ???? ????????????</h2>
                                                </div>
                                                <div className={CreateOrderCss.way_line}>
                                                    <input type="radio" className={CreateOrderCss.radio} name="address"
                                                           onClick={() => setTypeDelivery('3')}/>
                                                    <h2 className={CreateOrderCss.variant}>{'???????????????? ???????? ' + window.typeCDEK}</h2>
                                                </div>
                                            </div>
                                        </Fade>
                                        <Fade bottom>
                                            <button onClick={clickButton}
                                                    className={CreateOrderCss.next + ' col-xxl-10 col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12'}>??????????
                                            </button>
                                        </Fade>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        show={showMap}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title><h2 className={CreateOrderCss.variant}>???????????????? ?????????? ????????????</h2></Modal.Title>
                    </Modal.Header><div>
                        <Helmet>
                            <script>
                                {`{                   
                                   var widjet = new ISDEKWidjet({
                                       detailAddress: true,
                                       inregion: true,
                                       defaultCity: '????????????',
                                       cityFrom: '????????????',
                                       link: 'forpvz',
                                       path: 'https://widget.cdek.ru/widget/scripts/',
                                       servicepath: 'https://widget.cdek.ru/widget/scripts/service.php',
                                       goods: window.goods,
                                       onChoose: onChoose,
                                       onChooseAddress: onChooseAddress
                                   });
                   
                                   function onChoose(wat) {
                                       window.typeCDEK = "???? ????????????"
                                       window.postId = wat.id
                                       window.price = wat.price
                                       alert('?????????????????? ?????? ????????????????: ???????????????? ???? ???????????? ????????????                       ' + '?????????????????? ????????????????: ' + wat.price + ' ????????????')
                                   }
                   
                                   function onChooseAddress(wat) {
                                       window.typeCDEK = "???? ??????????"
                                       window.address = wat.address
                                       window.price = wat.price
                                       alert('?????????????????? ?????? ????????????????: ???????????????? ???? ??????????                       ' + '?????????????????? ????????????????: ' + wat.price + ' ????????????')
                                   }
                               }`}
                            </script>
                        </Helmet>
                        <div id="forpvz" style={{height: '600px'}}></div>
                    </div>
                    </Modal>
                    <ModalWindow show={showModal} text={'?????????????????? ?????? ????????'} onHide={() => setShowModal(false)} />
                    <Footer />
                </div>
                :
                <Fade>
                    <h2 className={CreateOrderCss.empty_text}>?????????????????? ??????????????</h2>
                </Fade>
            }
        </div>
    );
};

export default CreateOrder;
