export const callOpenAI = async (messages, language) => {
  console.log(process.env)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAPI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-0125',
      messages: messages,
      temperature: 1.5,
      presence_penalty: 1,
      max_tokens: 500,
    })
  });

  const data = await response.json();
  console.log(data)
  return data.choices[0].message.content;
};
