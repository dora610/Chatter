import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import './App.css';

import { useState, useEffect } from 'react';

// TODO: move url to .env
const socket = io.connect('http://localhost:5000');

const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('chat', { message, userName });
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat', (payload) => setChat([...chat, payload]));
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Chatter</h1>
        <p>You are : {userName}</p>
        <br />
        <div className='chats'>
          {chat.map((payload, index) => (
            <div
              key={index}
              className={
                payload.userName === userName
                  ? 'chat chat-right'
                  : 'chat chat-left'
              }
            >
              <span className='username'>
                {payload.userName === userName ? 'you' : payload.userName}
              </span>
              <span className='message'>{payload.message}</span>
            </div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input
            type='text'
            className='message'
            name='chat'
            placeholder='Send something'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
