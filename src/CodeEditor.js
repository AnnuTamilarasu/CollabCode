import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { socket } from './index';

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
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      width: '100%', 
      height: '100%' 
    }}>
      <div className="editor-container" style={{ 
        flex: 1, 
        display: 'flex', 
        width: '100%', 
        height: '100%',
        minHeight: '500px',
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <CodeMirror
          value={code}
          height="100%"
          width="100%"
          theme="dark"
          extensions={[javascript()]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default CodeEditor;