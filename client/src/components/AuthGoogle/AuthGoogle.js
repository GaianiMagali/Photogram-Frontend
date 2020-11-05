import React from 'react';
import GoogleLogin from "react-google-login";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { ButtonGoogle} from './styles';



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
        <ButtonGoogle>
            <GoogleLogin
                clientId="136692338397-mp7q1rq8r7gr8qcmq08ilqp1g240ne6r.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}

                buttonText={buttonTitle}

                render={ renderProps => (
                    <p  style={{marginTop:"9px", marginBottom:"5px",justifyContent: "center", alignItems: "center",   display: "flex",  cursor: "pointer" 
                    }}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <FcGoogle style={{ height: '20px', width: '20px' }} />
                        <span style={{ fontSize:"12px", font:"inherit", color:"#385185" ,justifyContent: "center"}}>{buttonTitle}</span>
                    </p>
                )}
            />
        </ButtonGoogle>
    )
}