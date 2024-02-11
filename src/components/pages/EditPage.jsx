import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getDoc, updateDoc, doc } from 'firebase/firestore';

import PageEditor from './PageEditor';

import { db } from '../../firebase-config';
import * as ROUTES from '../../constants/routes';

const EditPage = ({isAuth}) => {
  let { pageId } = useParams();
  const [page, setPage] = useState({ title: '', author: '' });

  let navigate = useNavigate();

  // Only authenticated users can edit pages
  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const getPage = async () => {
      console.log('Reading page from database');
      const docSnap = await getDoc(doc(db, 'pages', pageId));
      setPage(docSnap.data())
    };
    
    getPage();
  }, [pageId]);

  const updatePage = async (title, text) => {
    if (title !== page.title || text !== page.text) {
      console.log('Updating the page in a database');
      await updateDoc(doc(db, 'pages', pageId), {
          title, text
      });
    } else {
      console.log('Nothing has changed');
    }
  };

  return (
    <PageEditor
        currentTitle={ page.title }
        currentText={ page.text }
        onSubmitCallback={ updatePage } />
  );
};

export default EditPage;