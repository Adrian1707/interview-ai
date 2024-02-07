import React from 'react';
import { useNavigate } from 'react-router-dom';
import Language from './Language';
import './Languages.css';

const Languages = () => {
  const languages = [
    { id: 1, name: 'React', code: 'react' },
    { id: 2, name: 'Ruby', code: 'ruby' }
  ];

  const navigate = useNavigate();

  const onLanguageSelect = (language) => {
    navigate('/interview');
  };

  return (
    <div className="languages-grid">
      {languages.map((language) => (
        <Language key={language.id} language={language} onSelect={() => onLanguageSelect(language)} />
      ))}
    </div>
  );
};

export default Languages;
