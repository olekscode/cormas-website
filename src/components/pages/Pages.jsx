import React, { useState, useEffect } from 'react';
// import { getDocs, collection } from 'firebase/firestore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import { db } from '../../firebase-config';

const Pages = () => {
  const [pageList, setPageList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = Boolean(anchorEl);

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setPageList([
      {
        'id': 1,
        'author': { 'name': 'Oleksandr Zaitsev', id: 'oleks' },
        'title': 'A third page',
        'text': 'Bla bla bla'
      },
      {
        'id': 2,
        'author': { 'name': 'Oleksandr Zaitsev', id: 'oleks' },
        'title': 'Another page',
        'text': 'Lorem ipsum dolor sit amet'
      },{
        'id': 3,
        'author': { 'name': 'Oleksandr Zaitsev', id: 'oleks' },
        'title': 'Fifth page',
        'text': '# Title Body'
      },{
        'id': 4,
        'author': { 'name': 'Oleksandr Zaitsev', id: 'oleks' },
        'title': 'Hello world!',
        'text': 'This is my first page'
      },
    ]);
  }, []);

  // const pagesCollectionRef = collection(db, 'pages');

  // useEffect(() => {
  //   const getPages = async () => {
  //     const data = await getDocs(pagesCollectionRef);
  //     setPageList(data.docs.map((doc) => ({
  //       ...doc.data(), id: doc.id
  //     })))
  //   };

  //   getPages();
  // }, []);

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        List of Pages
      </Typography>
      <List>
        {pageList.map((page => (
          <ListItem
            secondaryAction={
              <IconButton edge='end' aria-label='menu' onClick={handleMenuIconClick} >
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={page.title}
              secondary={page.text}
            />
          </ListItem>
        )))}
      </List>
      <Menu
        id='item-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem key='edit' onClick={handleClose}>Edit</MenuItem>
        <MenuItem key='delete' onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default Pages;