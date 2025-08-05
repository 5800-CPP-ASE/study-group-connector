import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import axios from 'axios';

const Chat = () => {
  const { room } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const currentUserId = localStorage.getItem('userId');

  // effect hook to join room, fetch messages, listen for new ones
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/api/chat/${room}`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
      setMessages(res.data);
    };
    fetchMessages();

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER
    });
    const channel = pusher.subscribe(room);
    channel.bind('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [room]);

  // send message : emit 
  const sendMessage = async () => {
    if (text) {
      await axios.post('/api/chat/send', { 
        room, 
        receiver: room.split('_').find(id => id !== currentUserId), 
        text 
      }, { headers: { 'x-auth-token': localStorage.getItem('token') } });
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