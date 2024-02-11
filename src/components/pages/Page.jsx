import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

import ReactMarkdown from 'react-markdown';

import remarkGmf from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import rehypeStringify from 'rehype-stringify';

import { Typography } from "@mui/material";

import { db } from "../../firebase-config";

const Page = () => {
  const { pageId } = useParams();
  const [page, setPage] = useState({title: '', text: ''});

  useEffect(() => {
    const getPage = async () => {
      console.log('Reading page from database');
      const docSnap = await getDoc(doc(db, 'pages', pageId));
      setPage(docSnap.data())
    };
    
    getPage();
  }, [pageId]);

  

  return (
    <div>
      <Typography variant='h4'>{page.title}</Typography>
      <ReactMarkdown
          remarkPlugins={[remarkGmf,remarkMath]}
          rehypePlugins={[rehypeMathjax,rehypeStringify]}
          children={page.text} />
    </div>
  );
}

export default Page;