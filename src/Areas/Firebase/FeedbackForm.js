import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';

const FeedbackForm = () => {
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
    } catch (error) {
      console.error('Erro ao enviar feedback: ', error);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Your name:
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Your city:
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Your state:
            <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Rate our service:
            <div style={{ display: 'flex', gap: '5px' }}>
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
          </label>
        </div>
        <div>
          <label>
            Write your feedback:
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </label>
        </div>
        <button type="submit">Send</button>
      </form>
  );
};

export default FeedbackForm;
