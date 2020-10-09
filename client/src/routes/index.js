import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Main } from '../pages/Main/Main';
import { Signin } from '../pages/Signin/Signin';
import { Signup } from '../pages/Signup/Signup';

const Routes = () => {
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
                draggable
            />

            <Switch>
                <Route exact path="/" component={Main} isPrivate />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;