import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callOpenAI } from './api.js'

const InterviewWindow = () => {
  let { language } = useParams();
  const [messages, setMessages] = useState([
    {"role": "system", "content": `You are interviewing a candidate for a senior ${language} developer role. You will present a list of questions to the interviewee to assess their suitability for a senior ${language} position. Give me 1 question to get started`}
  ])
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const fetchData = async () => {
    try {
      const response = await callOpenAI(messages, language);
      return response;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
    }
  };

  useEffect(() => {
    fetchData().then(response => {
      setMessages(currentMessages => [...currentMessages, {'role': "system", 'content': response}]);
      setChat(currentChat => [...currentChat, response]);
    });
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    setChat(currentChat => [...currentChat, message]);

    setMessages(currentMessages => {
        const updatedMessages = [...currentMessages, {'role': "user", 'content': message}];

        (async () => {
            try {

                const response = await callOpenAI(updatedMessages, language);

                setMessages(currentMessages => [...currentMessages, {'role': "system", 'content': response}]);
                setChat(currentChat => [...currentChat, response]);
            } catch (error) {
                console.error('Error calling OpenAI:', error);
            }
        })();


        return updatedMessages;
    });

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
