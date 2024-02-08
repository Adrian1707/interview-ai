import React, { useState, useEffect, useRef } from 'react';
import './Modal.css'; // Ensure you have a
import { useNavigate } from 'react-router-dom';

const InterviewSettingsModal = ({language, onClose}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [interviewerPersonality, setInterviewerPersonality] = useState('');
  const modalRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/interview', { state: { experienceLevel, interviewerPersonality, language } });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
     if (modalRef.current && !modalRef.current.contains(event.target)) {
       onClose(); // This function should be passed from the parent component to close the modal
     }
  };

  const levelEmojis = {
    Junior: "🐣",
    Mid: "🚶‍♂️",
    Senior: "🧗",
    Expert: "🧠"
  };

  const personalityEmojis = {
  Friendly: "😊", // Smiling Face for Friendly
  Caring: "💖", // Sparkling Heart for Caring
  Antagonistic: "😠", // Angry Face for Antagonistic
  Impatient: "⏳", // Hourglass Not Done for Impatient, representing the feeling of waiting or urgency
};

  return (
    <div className="modal-overlay">
      <div className="modal"  ref={modalRef}>
        <form onSubmit={handleSubmit}>
          <div className="columns-wrapper">
            <div className="column">
              <h1 className="column-title">Experience Level</h1>
              {Object.entries(levelEmojis).map(([level, emoji]) => (
                <label key={level} className="radio-label">
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={level}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  />
                  {`${emoji} ${level}`}
                </label>
              ))}
            </div>
            <div className="column">
              <h1 className='column-title'>Interviewer Personality</h1>
              {Object.entries(personalityEmojis).map(([personality, emoji]) => (
                <label key={personality} className="radio-label">
                  <input
                    type="radio"
                    name="personality"
                    value={personality}
                    onChange={(e) => setInterviewerPersonality(e.target.value)}
                  />
                  {`${emoji} ${personality}`}
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
