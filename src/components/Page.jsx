import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import remarkGmf from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax'
import rehypeStringify from 'rehype-stringify'

import $ from "jquery";

import * as URLS from '../constants/urls';

import PageNotFoundPage from './pages/PageNotFoundPage';

import highlightCode from '../util/CodeHighlighter';


const getContentsOfFileFromURL = url => {
  var result = null;
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'text',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  return result;
}

const getJsonFromURL = url =>
  JSON.parse(getContentsOfFileFromURL(url));

const loadPostMarkdown = pageId =>
  getContentsOfFileFromURL(URLS.PAGES_FOLDER + `/${pageId}/${pageId}-en.md`);

const preprocessPostMarkdown = (markdown, pageId) => {
  markdown = fixRelativeImagePaths(markdown, pageId);
  return markdown;
};

const fixRelativeImagePaths = (markdown, pageId) => {
  return markdown.replace(/(!\[.*?\]\()/g, `$1${URLS.PAGES_FOLDER}/${pageId}/`);
};


export default function Page() {

  let { id } = useParams();

  var markdown = loadPostMarkdown(id);
  markdown = preprocessPostMarkdown(markdown, id);

  const markdownComponents = {
    code: highlightCode
  };

  return(
    <div>
      <div id='post-content' className='container'>
        <ReactMarkdown
          remarkPlugins={[remarkGmf,remarkMath]}
          rehypePlugins={[rehypeMathjax,rehypeStringify]}
          components={markdownComponents}
          children={markdown} />
      </div>
    </div>
  )
}