import React, { useState } from 'react';
import InterviewSettingsModal from './InterviewSettingsModal';
import './Languages.css';

const Language = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);

  const imagePath = require(`./images/${language.code}.png`);

   const imageStyle = {
     width: '100%',
     height: 'auto',
     objectFit: 'contain'
   };

   const onSelect = (language) => {
     console.log("Rendering modal...")
     setIsVisible(true)
   };

   const handleCloseModal = () => {
     setIsVisible(false);
   };

   return (
     <div>
       <div className="language-box" onClick={() => onSelect(language)}>
         <img src={imagePath} alt={language.name} style={imageStyle} />
       </div>
       { isVisible && <InterviewSettingsModal language={language.name} onClose={handleCloseModal} /> }
     </div>
   );
};


export default Language
