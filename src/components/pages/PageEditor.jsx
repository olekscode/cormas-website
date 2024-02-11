import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import * as ROUTES from '../../constants/routes';

const PageEditor = ({currentTitle, currentText, onSubmitCallback}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => { setTitle(currentTitle) }, [currentTitle]);
  useEffect(() => { setText(currentText) }, [currentText]);

  console.log(title);

  let navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    onSubmitCallback(title, text);
    navigate(ROUTES.PAGES);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <Stack spacing={2}>
        <TextField
          id='pageTitleEdit'
          label='Page title'
          value={ title }
          fullWidth
          required
          onChange={ (event) => { setTitle(event.target.value) } }
        />
        <TextField
          id='pageTextEdit'
          label='Page contents'
          value={ text }
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

export default PageEditor;