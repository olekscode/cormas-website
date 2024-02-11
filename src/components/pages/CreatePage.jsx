import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { addDoc, collection } from 'firebase/firestore';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { db, auth } from '../../firebase-config';
import * as ROUTES from '../../constants/routes';

const CreatePage = ({isAuth}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  let navigate = useNavigate();

  const pagesCollectionRef = collection(db, 'pages');

  const createPage = async () => {
    await addDoc(pagesCollectionRef, {
      title,
      text,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
    });
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuth, navigate]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        createPage();
      }}
    >
      <Stack spacing={2}>
        <TextField
          id='title'
          label='Page title'
          fullWidth
          required
          onChange={ (event) => { setTitle(event.target.value) } }
        />
        <TextField
          id='text'
          label='Page contents'
          fullWidth
          required
          multiline
          rows={4}
          onChange={ (event) => { setText(event.target.value) } }
        />
        <Button type='submit'>Submit</Button>
      </Stack>
    </form>
  );
};

export default CreatePage;