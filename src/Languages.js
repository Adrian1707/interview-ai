import React from 'react';
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
  return (
    <div className="languages-grid">
      {languages.map((language) => (
        <Language key={language.id} language={language} />
      ))}
    </div>
  );
};

export default Languages;
