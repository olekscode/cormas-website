import React from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';

import * as ROUTES from '../../constants/routes';

const Login = ({setIsAuth}) => {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate(ROUTES.HOME);
    });
  };

  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" onClick={ signInWithGoogle }>Sign in with Google</button>
    </div>
  );
};

export default Login;