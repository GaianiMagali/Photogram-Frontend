import React from 'react';
import GoogleLogin from "react-google-login";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
//FcGoogle

export const AuthGoogle = ({ buttonTitle }) => {
    const history = useHistory();
    const { authWithGoogle } = useAuth();

    const responseGoogle = async ({ profileObj }) => {
        const { googleId, name, email, imageUrl } = profileObj;
        console.log(profileObj)
        let user = {
            password: googleId || '',
            name,
            username: name,
            email: email,
            avatar_url: imageUrl
        };

        await authWithGoogle(user)

        history.push('/');


    };

    return (
        <div>
            <GoogleLogin
                clientId="136692338397-mp7q1rq8r7gr8qcmq08ilqp1g240ne6r.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}

                buttonText={buttonTitle}
            // render={renderProps => (
            //     <button
            //         onClick={renderProps.onClick}
            //         className="btn btn-raised google-button d-flex justify-content-center align-items-center"
            //         disabled={renderProps.disabled}
            //     >
            //         <img src={googleLogo} alt="logo" style={{height:'30px', width:'30px'}}/>
            //         <span className="pl-2">{buttonTitle}</span>
            //     </button>
            // )}
            />
        </div>
    )
}