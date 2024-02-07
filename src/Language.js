import React from 'react';
import './Languages.css';

const Language = ({ language, onSelect }) => {
  const imagePath = require(`./images/${language.code}.png`);

   // Define a style object to control the size of the images
   const imageStyle = {
     width: '100%', // This will make the image responsive to the container size
     height: 'auto', // This will maintain the aspect ratio of the image
     objectFit: 'contain' // This will ensure the image is fully visible
   };

   return (
     <div className="language-box" onClick={() => onSelect(language)}>
       <img src={imagePath} alt={language.name} style={imageStyle} />
     </div>
   );
};


export default Language
