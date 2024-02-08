import React from 'react';
import './Languages.css';

const Language = ({ language, onSelect }) => {
  const imagePath = require(`./images/${language.code}.png`);

   const imageStyle = {
     width: '100%',
     height: 'auto',
     objectFit: 'contain' 
   };

   return (
     <div className="language-box" onClick={() => onSelect(language)}>
       <img src={imagePath} alt={language.name} style={imageStyle} />
     </div>
   );
};


export default Language
