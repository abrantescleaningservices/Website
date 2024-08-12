import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';

const FeedbackForm = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [rating, setRating] = useState(0);  // Default rating is 0
  const [approved, setApproved] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const feedbackData = {
        name,
        city,
        state,
        date: new Date().toISOString(), // Set the current date
        rating,  // No need to parse, as rating is already an integer
        approved,
        comment,
        timestamp: serverTimestamp()
      };

      await addDoc(collection(db, 'feedback'), feedbackData);

      // Clear the form fields after successful submission
      setName('');
      setCity('');
      setState('');
      setRating(0);  // Reset rating to 0
      setApproved(false);
      setComment('');

      alert('Feedback enviado com sucesso!');
      closeModal(); // Fecha o modal após o envio do feedback
    } catch (error) {
      console.error('Erro ao enviar feedback: ', error);
    }
  };

  return (
      <div className="feedback-form-container">
        <h1 className="form-title">Customer Feedback Form</h1>


        <div className="feedback-question">
          <p style={{ textAlign: "center" }}>Your name:</p>
          <input type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)} className="feedback-input" />

          <p style={{ textAlign: "center" }}>Your city:</p>
          <input type="text"
                 value={city}
                 onChange={(e) => setCity(e.target.value)} className="feedback-input" />

          <p style={{ textAlign: "center" }}>Your State:</p>
          <input type="text"
                 value={state}
                 onChange={(e) => setState(e.target.value)} className="feedback-input" />

          <p style={{ textAlign: "center" }}>Rate our service:</p>
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                    key={value}
                    size={24}
                    color={value <= rating ? '#ffc107' : '#e4e5e9'}
                    onClick={() => setRating(value)}
                    style={{ cursor: 'pointer' }}
                />
            ))}
          </div>

          <p style={{ textAlign: "center" }}>Write your feedback:</p>
          <textarea className="feedback-input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
  );
};

export default FeedbackForm;
