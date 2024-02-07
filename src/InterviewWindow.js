import React, { useState } from 'react';

const InterviewWindow = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = (event) => {
    event.preventDefault();
    setChat([...chat, message]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
    <div className="flex-grow overflow-auto p-4">
      {chat.map((message, index) => (
        <div key={index} className="p-2 bg-blue-200 rounded mb-2">
          {message}
        </div>
      ))}
    </div>
    <form className="mt-auto p-2" onSubmit={sendMessage}>
      <input
        className="w-full p-2 border rounded"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="w-full p-2 bg-blue-500 text-white rounded mt-2" type="submit">
        Send
      </button>
    </form>
  </div>

  );
};

export default InterviewWindow;
