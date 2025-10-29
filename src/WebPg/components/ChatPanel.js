import React from "react";

function ChatPanel() {
  return (
    <div className="Chat" id="chat-panel">
      <div className="chat-nav">
        <button id="chat-toggle" className="chat-toggle" title="Collapse chat">
          ‹
        </button>
        <button className="chat-tab active" data-tab="main">Chat</button>
        <button className="chat-tab" data-tab="history">History</button>
        <button className="chat-tab" data-tab="settings">Settings</button>
      </div>
      <div className="chat-content">
        <div className="chat-view" id="main-view">
          <div className="chat-inner"></div>
          <div className="footer"></div>
        </div>
        <div className="chat-view hidden" id="history-view">No previous chats.</div>
        <div className="chat-view hidden" id="settings-view">Settings panel.</div>
      </div>
    </div>
  );
}

export default ChatPanel;
