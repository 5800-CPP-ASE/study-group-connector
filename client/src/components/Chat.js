import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io(); // initialize socket.io

const Chat = () => {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const currentUserId = localStorage.getItem('userId');

  // effect hook to join room, fetch messages, listen for new ones
  useEffect(() => {
    socket.emit('joinRoom', room);
    const fetchMessages = async () => {
      const res = await axios.get(`/api/chat/${room}`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setMessages(res.data);
    };
    fetchMessages();

    socket.on('message', async (message) => {
      
      const updatedMessages = await axios.get(`/api/chat/${room}`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setMessages(updatedMessages.data);
    });

    return () => socket.off('message');
  }, [room]);

  // send message : emit via socket.io
  const sendMessage = () => {
    if (text) {
      socket.emit('sendMessage', { room, sender: currentUserId, receiver: room.split('_').find(id => id !== currentUserId), text });
      setText('');
    }
  };

  // Render chat ui
  return (
    <div>
      <h2>Chat</h2>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <p key={i}>
            {msg.sender ? msg.sender.email : 'Unknown'} to {msg.receiver ? msg.receiver.email : 'Unknown'}: {msg.text}
          </p>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;