import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Main } from '../pages/Main/Main';
import { Signin } from '../pages/Signin/Signin';
import { Signup } from '../pages/Signup/Signup';
import { Post } from '../pages/Post/Post';
import { Profile } from '../pages/Profile/Profile';
import { EditProfile } from '../pages/EditProfile/EditProfile';
import { ForgotPassword } from '../pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword/ResetPassword';

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
                <Route exact path="/photo/:photo_id" component={Post} isPrivate />
                <Route exact path="/edit-profile/:id" component={EditProfile} isPrivate />
                <Route exact path="/profile/:username" component={Profile} isPrivate />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/reset-password/:token" component={ResetPassword} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
            </Switch>

        </BrowserRouter>
    )
}

export default Routes;