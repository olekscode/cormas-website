import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { addDoc, collection } from 'firebase/firestore';

import PageEditor from './PageEditor';

import { db, auth } from '../../firebase-config';
import * as ROUTES from '../../constants/routes';

const CreatePage = ({isAuth}) => {
  let navigate = useNavigate();

  // Only authenticated users can edit pages
  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuth, navigate]);

  const pagesCollectionRef = collection(db, 'pages');

  const createPage = async (title, text) => {
    console.log('Adding a new page to a database');
    await addDoc(pagesCollectionRef, {
      title,
      text,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
    });
  };

  return (
    <PageEditor onSubmitCallback={ createPage } />
  );
};

export default CreatePage;