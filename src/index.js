import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { io } from 'socket.io-client';
import './index.css';

export const socket = io('http://localhost:4000', {
  transports: ['websocket'],
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
