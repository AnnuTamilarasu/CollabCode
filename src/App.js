import React from "react";
import CodeEditor from "./CodeEditor";
import "./WebPg/CSS/Code.css";
import "./WebPg/CSS/nav.css";
import "./WebPg/JS/nav";
import ChatPanel from "./WebPg/components/ChatPanel";

function App() {
  return (
    <div className="App">
      <div id="navbar-container"></div>
      <div className="main-container" style={{ flex: 1, display: 'flex' }}>
        <div className="CodeSpace" style={{ flex: 1 }}>
          <CodeEditor />
        </div>
        <ChatPanel />
      </div>
    </div>
  );
}

export default App;
