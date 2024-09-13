import React, { useState } from 'react';
import { db, storage } from './firebase'; // Import storage from Firebase
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary functions from storage
import { FaStar } from 'react-icons/fa';

const FeedbackForm = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [rating, setRating] = useState(0);
  const [approved, setApproved] = useState(false);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null); // State for the image file
  const [error, setError] = useState(''); // State for error message

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB in bytes
      setError('Max size 5MB');
      setImage(null);
    } else {
      setError('');
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (image) {
        // Gera um número aleatório de 1 a 1000
        const randomNum = Math.floor(Math.random() * 1000) + 1;

        // Adiciona o número ao final do nome do arquivo
        const fileName = `${image.name.split('.')[0]}_${randomNum}.${image.name.split('.').pop()}`;

        const storageRef = ref(storage, `feedback_images/${fileName}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const feedbackData = {
        name,
        city,
        state,
        date: new Date().toISOString(),
        rating,
        approved,
        comment,
        imageUrl, // Store the image URL in the database
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'feedback'), feedbackData);

      // Clear the form fields
      setName('');
      setCity('');
      setState('');
      setRating(0);
      setApproved(false);
      setComment('');
      setImage(null);

      alert('Feedback enviado com sucesso!');
      closeModal();
    } catch (error) {
      console.error('Erro ao enviar feedback: ', error);
    }
  };

  return (
      <div className="feedback-form-container">
        <h1 className="form-title">Customer Feedback Form</h1>

        <div className="feedback-question">
          <p style={{ textAlign: "center" }}>Your name:</p>
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="feedback-input"
          />

          <p style={{ textAlign: "center" }}>Your city:</p>
          <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="feedback-input"
          />

          <p style={{ textAlign: "center" }}>Your State:</p>
          <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="feedback-input"
          />

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
          <textarea
              className="feedback-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <p style={{ textAlign: "center" }}>Upload an image (optional):</p>
          <input type="file" onChange={handleImageChange} />
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>

        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit} disabled={!!error}>Submit</button>
        </div>
      </div>
  );
};

export default FeedbackForm;
