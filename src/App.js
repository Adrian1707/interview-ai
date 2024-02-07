import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Languages from './Languages';
import InterviewWindow from './InterviewWindow';

import './index.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Languages />} />
      <Route path="/interview" element={<InterviewWindow />} />
    </Routes>
  );
};


export default App;
