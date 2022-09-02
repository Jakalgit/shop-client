import logo from './logo.svg';
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import React, {useContext, useEffect, useState} from "react";
import {init} from "./http/userAPI";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import {getAllBasketItems} from "./http/API/basketItemAPI";
import {initBasket} from "./http/API/basketAPI"
import general from "./css/General.module.css";

const App = observer(() => {

    const {user} = useContext(Context)
    const {item} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        init().then(data => {
            user.setUser(data.data)
            initBasket(user.user.id).then(data => {
                console.log(data)
                user.setBasket(data)
                getAllBasketItems(user.basket.id).then(data => {
                    data.sort((prev, next) => prev.id - next.id)
                    item.setBasketItems(data)
                    setLoading(false)
                })
            })
        })
    }, [])

    user.setIsAdmin(user.user.role === 'ADMIN')

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

  return (
      <BrowserRouter>
          <NavBar />
        <AppRouter />
      </BrowserRouter>
  );
})

export default App;