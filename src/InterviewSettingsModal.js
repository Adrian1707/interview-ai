import React, { useState } from 'react';
import './Modal.css'; // Ensure you have a
import { useNavigate } from 'react-router-dom';

const InterviewSettingsModal = ({language}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [interviewerPersonality, setInterviewerPersonality] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/interview', { state: { experienceLevel, interviewerPersonality, language } });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="columns-wrapper">
            <div className="column">
              <h1 className="column-title">Experience Level</h1>
              {["Junior", "Mid", "Senior", "Expert"].map((level) => (
                <label key={level} className="radio-label">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={level}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  />
                  {level}
                </label>
              ))}
            </div>
            <div className="column">
              <h1 className='column-title'>Interviewer Personality</h1>
              {["Friendly", "Caring", "Antagonistic", "Impatient"].map((personalityOption) => (
                <label key={personalityOption} className="radio-label">
                  <input
                    type="radio"
                    name="personality"
                    value={personalityOption}
                    onChange={(e) => setInterviewerPersonality(e.target.value)}
                  />
                  {personalityOption}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-btn" onSubmit={handleSubmit}>Start Interview</button>
        </form>
      </div>
    </div>
  );
}


export default InterviewSettingsModal
