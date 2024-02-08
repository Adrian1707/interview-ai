import React from 'react';
import { useNavigate } from 'react-router-dom';
import Language from './Language';
import './Languages.css';

const Languages = () => {
  const languages = [
    { id: 1, name: 'React', code: 'react' },
    { id: 2, name: 'Ruby', code: 'ruby' },
    { id: 3, name: 'Python', code: 'python' },
    { id: 4, name: 'Golang', code: 'golang' },
    { id: 5, name: 'Rust', code: 'rust' },
    { id: 6, name: 'CSS', code: 'css' },
    { id: 7, name: 'Redux', code: 'redux' },
    { id: 8, name: 'SQL', code: 'sql' },
  ];

  const navigate = useNavigate();

  const onLanguageSelect = (language) => {
    navigate(`/interview/${language.code}`);
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
