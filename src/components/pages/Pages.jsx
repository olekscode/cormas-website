import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { db } from '../../firebase-config';
import * as ROUTES from '../../constants/routes';

const Pages = ({isAuth}) => {
  const [pageList, setPageList] = useState([]);

  const [selectedListItem, setSelectedListItem] = useState({
    anchorEl: null,
    page: null
  });

  let navigate = useNavigate();

  const openMenu = Boolean(selectedListItem.anchorEl);
  console.log('Rendering the component');

  const handleClose = () => {
    setSelectedListItem({
      anchorEl: null,
      page: null
    });
  };

  const handleMenuIconClick = (event, page) => {
    setSelectedListItem({
      anchorEl: event.currentTarget,
      page: page
    });
  };

  const handleDeletePage = () => {
    console.log('Deleting page ' + selectedListItem.page.id);
    deletePage();
    handleClose();
  };

  const handleEditPage = () => {
    console.log('Editing page ' + selectedListItem.page.id);
    navigate(ROUTES.EDIT_PAGE.replace(':pageId', selectedListItem.page.id));
  };

  const deletePage = async () => {
    const pageDoc = doc(db, 'pages', selectedListItem.page.id);
    await deleteDoc(pageDoc);

    setPageList(pageList.filter((page) => (page.id !== selectedListItem.page.id)));
  };

  useEffect(() => {
    const pagesCollectionRef = collection(db, 'pages');

    const getPages = async () => {
      console.log('Reading pages from database');

      const data = await getDocs(pagesCollectionRef);
      setPageList(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    };

    getPages();
  }, []);

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        List of Pages
      </Typography>
      <List>
        {pageList.map((page => (
          <ListItem
            key={page.id}
            component={Link}
            to={ ROUTES.PAGE.replace(':pageId', page.id) }
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
            { isAuth && (
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='menu' onClick={(event) => handleMenuIconClick(event, page)} >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            ) }
          </ListItem>
        )))}
      </List>
      <Menu
        id='item-menu'
        anchorEl={selectedListItem.anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem key='edit' aria-label='edit page' onClick={handleEditPage}>Edit</MenuItem>
        <MenuItem key='delete' aria-label='delete page' onClick={handleDeletePage}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default Pages;