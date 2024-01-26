import rangeParser from 'parse-numeric-range';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import smalltalk from 'react-syntax-highlighter/dist/cjs/languages/prism/smalltalk';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';

import './style.css';

SyntaxHighlighter.registerLanguage('smalltalk', smalltalk);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('python', python);

const SYNTAX_THEME = oneLight;
const SHOULD_SHOW_LINE_NUMBERS = false;


export default function highlightCode({ node, inline, className, ...props }) {
  const match = /language-(\w+)/.exec(className || '');
  const hasMeta = node?.data?.meta;
  console.log(match);

  const applyHighlights = (applyHighlights) => {
      if (hasMeta) {
      const RE = /{([\d,-]+)}/;
      const metadata = node.data.meta?.replace(/\s/g, '');

      const strlineNumbers = RE?.test(metadata)
          ? RE?.exec(metadata)[1]
          : '0';

      const highlightLines = rangeParser(strlineNumbers);
      const highlight = highlightLines;

      const data = highlight.includes(applyHighlights) ? 'highlight' : null;
      return { data }
      } else {
      return {};
      }
  };

  return match ? (
      <SyntaxHighlighter
      style={SYNTAX_THEME}
      language={match[1].toLowerCase()}
      PreTag="div"
      className="codeStyle"
      showLineNumbers={SHOULD_SHOW_LINE_NUMBERS}
      wrapLines={hasMeta ? true : false}
      useInlineStyles={true}
      lineProps={applyHighlights}
      {...props}
      />
  ) : (
      <code className={className} {...props} />
  )
}