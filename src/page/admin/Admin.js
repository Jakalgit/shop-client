import React from 'react';
import AdminCss from "../../css/admin/Admin.module.css"
import {useNavigate} from "react-router-dom";
import {
    BRAND_ROUTE,
    CATEGORY_ROUTE,
    CATEGORYDOWN_ROUTE,
    CHANGE_SCALE_ROUTE,
    CHANGEBRAND_ROUTE,
    CHANGECATEGORY_ROUTE,
    CHANGECATEGORYDOWN_ROUTE,
    CREATE_SCALE_ROUTE,
    CREATEITEM_ROUTE,
    FINDCHANGE_ROUTE,
    ORDERS_ROUTE
} from "../../utils/consts";
import Footer from "../../components/Footer";

const Admin = () => {

    const navigate = useNavigate()

    return (
        <section className="admin-section">
            <div className={AdminCss.admin + ' admin'}>
                <div className="container">
                    <div className="row">
                        <h1 className={AdminCss.admin_panel + ' col-xxl-8 offset-xxl-2'}>Страница администратора</h1>
                        <div className={AdminCss.admin_button_block}>
                            <div className="row">
                                <button onClick={() => navigate(CREATEITEM_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Добавить товар
                                </button>
                                <button onClick={() => navigate(CATEGORYDOWN_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Добавить подкатегорию
                                </button>
                                <button onClick={() => navigate(CATEGORY_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Добавить категорию
                                </button>
                                <button onClick={() => navigate(BRAND_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Добавить бренд
                                </button>
                                <button onClick={() => navigate(CREATE_SCALE_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Добавить масштаб
                                </button>
                                <button onClick={() => navigate(ORDERS_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Заказы
                                </button>
                            </div>
                        </div>
                        <div className={AdminCss.change_block}>
                            <div className="row">
                                <button onClick={() => navigate(FINDCHANGE_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Редактировать товар
                                </button>
                                <button onClick={() => navigate(CHANGECATEGORYDOWN_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Редактировать подкатегорию
                                </button>
                                <button onClick={() => navigate(CHANGECATEGORY_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Редактировать категорию
                                </button>
                                <button onClick={() => navigate(CHANGEBRAND_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Редактировать бренд
                                </button>
                                <button onClick={() => navigate(CHANGE_SCALE_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Редактировать масштаб
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Admin;