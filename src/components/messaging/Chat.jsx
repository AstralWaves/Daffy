import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export default function Chat({ userId, friendId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    
    socketRef.current.emit('join', { userId, friendId });
    
    socketRef.current.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socketRef.current.disconnect();
  }, [userId, friendId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socketRef.current.emit('sendMessage', {
        userId,
        friendId,
        text: newMessage
      });
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.userId === userId
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}