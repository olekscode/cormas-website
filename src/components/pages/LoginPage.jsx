import React from 'react';

import { auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';

const LoginPage = ({setIsAuth}) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
    });
  };

  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" onClick={ signInWithGoogle }>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;