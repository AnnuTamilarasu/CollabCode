import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function CodeEditor() {
  const [code, setCode] = useState('// Start coding here...');

  useEffect(() => {
    socket.on('codeUpdate', (newCode) => {
      setCode(newCode);
    });

    return () => socket.off('codeUpdate');
  }, []);

  const handleChange = (value) => {
    setCode(value);
    socket.emit('codeChange', value);
  };

  return (
    <div className="editor-container">
      <CodeMirror
        value={code}
        height="400px"
        theme="dark"
        extensions={[javascript()]}
        onChange={(value) => handleChange(value)}
      />
    </div>
  );
}

export default CodeEditor;
