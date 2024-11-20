import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CodeBlock({ code, language }) {
  return (
    <SyntaxHighlighter language={language} style={atomOneDark}>
      {code}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;