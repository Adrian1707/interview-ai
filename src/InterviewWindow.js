import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { callOpenAI } from './api.js'
import { buildInitialPrompt } from './prompt-builder.js'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const InterviewWindow = () => {
  const location = useLocation();
  const { experienceLevel, interviewerPersonality, language } = location.state || {};
  const [messages, setMessages] = useState([
    {"role": "system", "content": buildInitialPrompt(language, experienceLevel, interviewerPersonality)}
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

                setMessages(currentMessages => [...currentMessages, {'role': "assistant", 'content': response}]);
                setChat(currentChat => [...currentChat, {content: response, user: 'bot'}]);
            } catch (error) {
                console.error('Error calling OpenAI:', error);
            }
        })();


        return updatedMessages;
    });

    setMessage('');
  };

  const formatAndDisplayMessage = (message) => {
    // Regular expression to match the code block and its language
    const codeBlockRegex = /```(\w+)\s([\s\S]*?)```/;
    const match = message.match(codeBlockRegex);

    if (match) {
      const language = match[1];
      const code = match[2];

      const recognizedLanguages = [language]
      const isLanguageRecognized = recognizedLanguages.includes(language.toLowerCase());

      return (
        <div>
          {/* Display the message part before the code block */}
          {message.substring(0, match.index)}
          {/* SyntaxHighlighter to display the code block */}
          <SyntaxHighlighter
            language={isLanguageRecognized ? language : 'plaintext'}
            style={solarizedlight}
          >
            {code}
          </SyntaxHighlighter>
          {/* Display the message part after the code block */}
          {message.substring(match.index + match[0].length)}
        </div>
      );
    }

    // Return the original message if no code block is found
    return <div>{message}</div>;
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
          {formatAndDisplayMessage(message.content)}
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
