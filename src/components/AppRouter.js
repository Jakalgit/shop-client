import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import {adminRoutes, routes} from "../routes";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>

            {user.isAdmin === true && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {routes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}

        </Routes>
    );
};

export default AppRouter;