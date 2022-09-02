import React, {useContext} from 'react';
import NavBarCss from '../css/components/NavBar.module.css'
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const NavBar = observer( () => {
    const {user} = useContext(Context)
    return (
        <Navbar className={NavBarCss.header} variant="dark" expand="lg">
            {user.isAdmin ?
                <Container>
                    <Navbar.Brand className={NavBarCss.navbar_brand} href="/home">ShopRC</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto offset-xxl-1 offset-xl-1 offset-lg-1">
                            <Nav.Link className={NavBarCss.navbar_link} href="/catalog">Каталог</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link} href="/find">Поиск</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link} href="/delivery-and-pay">Доставка и оплата</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link} href="/basket">Корзина</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link} href="/find-your-order">Ваш заказ</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link} href="/admin">Панель админа</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                :
                <Container>
                    <Navbar.Brand className={NavBarCss.navbar_brand} href="/home">ShopRC</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto offset-xxl-1 offset-xl-1 offset-lg-1">
                            <Nav.Link className={NavBarCss.navbar_link + ' ' + NavBarCss.navbar_link_user} href="/catalog">Каталог</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link + ' ' + NavBarCss.navbar_link_user} href="/find">Поиск</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link + ' ' + NavBarCss.navbar_link_user} href="/basket">Корзина</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link + ' ' + NavBarCss.navbar_link_user} href="/find-your-order">Ваш заказ</Nav.Link>
                            <Nav.Link className={NavBarCss.navbar_link + ' ' + NavBarCss.navbar_link_user} href="/delivery-and-pay">Доставка и оплата</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            }
        </Navbar>
    );
});

export default NavBar;