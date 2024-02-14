import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { storage } from '../../firebase-config';
import * as ROUTES from '../../constants/routes';
import { ImageList, ImageListItem } from '@mui/material';

const ImageStorage = ({isAuth}) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  let navigate = useNavigate();

  // Only authenticated users can edit pages
  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    const imageListRef = ref(storage, 'images/');

    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  console.log(imageList);
  
  return (
    <div>
      <input type='file' onChange={ (event) => setImageUpload(event.target.files[0]) } />
      <button onClick={ uploadImage }>Upload Image</button>

      <ImageList sx={{ width: 500, height: 450}} cols={3} rowHeight={164}>
        {imageList.map((url) => (
          <ImageListItem key={url}>
            <img
              srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${url}?w=164&h=164&fit=crop&auto=format`}
              alt=''
              loading='lazy' />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ImageStorage;