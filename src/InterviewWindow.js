import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callOpenAI } from './api.js'
import { buildInitialPrompt } from './prompt-builder.js'

const InterviewWindow = () => {
  let { language } = useParams();
  const [messages, setMessages] = useState([
    {"role": "system", "content": buildInitialPrompt(language, 'junior', 'kind')}
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
      setChat(currentChat => [...currentChat, {content: response, user: 'bot'}]);
    });
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    setChat(currentChat => [...currentChat, {content: message, user: 'human'}]);

    setMessages(currentMessages => {
        const updatedMessages = [...currentMessages, {'role': "user", 'content': message}];

        (async () => {
            try {

                const response = await callOpenAI(updatedMessages, language);

                setMessages(currentMessages => [...currentMessages, {'role': "system", 'content': response}]);
                setChat(currentChat => [...currentChat, {content: response, user: 'bot'}]);
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
        <div
          key={index}
          className={`p-2 rounded mb-2 ${message.user === "human" ? "bg-blue-200 ml-auto" : "bg-green-200 mr-auto"}`}
          style={{ maxWidth: "70%" }}
        >
          {message.content}
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
