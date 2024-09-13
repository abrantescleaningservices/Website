import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase'; // Import storage from Firebase
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage'; // Import deleteObject from Firebase storage
import './Feedbackmanager.css';

const FeedbackManager = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const feedbackCollection = collection(db, 'feedback');
            const feedbackSnapshot = await getDocs(feedbackCollection);
            const feedbackList = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFeedbacks(feedbackList);
        };

        fetchFeedbacks();
    }, []);

    const handleDelete = async (id, imageUrl) => {
        try {
            // Verifica se há uma imagem associada e a remove do Firebase Storage
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }

            // Deleta o documento do Firestore
            await deleteDoc(doc(db, 'feedback', id));
            setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
            alert('Feedback deleted successfully!');
        } catch (error) {
            console.error('Error deleting feedback: ', error);
        }
    };

    const handleRemoveImage = async (id, imageUrl) => {
        try {
            // Deletar a imagem do Firebase Storage
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);

            // Atualizar o documento para remover a URL da imagem
            const feedbackDoc = doc(db, 'feedback', id);
            await updateDoc(feedbackDoc, { imageUrl: '' });

            // Atualizar o estado local
            setFeedbacks(feedbacks.map(feedback =>
                feedback.id === id ? { ...feedback, imageUrl: '' } : feedback
            ));

            alert('Image removed successfully!');
        } catch (error) {
            console.error('Error removing image: ', error);
        }
    };

    const toggleApproval = async (id, currentApproval) => {
        try {
            const feedbackDoc = doc(db, 'feedback', id);
            await updateDoc(feedbackDoc, { approved: !currentApproval });
            setFeedbacks(feedbacks.map(feedback =>
                feedback.id === id ? { ...feedback, approved: !currentApproval } : feedback
            ));
        } catch (error) {
            console.error('Error updating approval: ', error);
        }
    };

    return (
        <div className="feedback-manager-container">
            <h1 className="feedback-manager-title">Clients Feedback</h1>
            {feedbacks.length > 0 ? (
                <ul className="feedback-manager-list">
                    {feedbacks.map(feedback => (
                        <li key={feedback.id} className="feedback-manager-item">
                            <p><strong>Name:</strong> {feedback.name}</p>
                            <p><strong>City:</strong> {feedback.city}</p>
                            <p><strong>State:</strong> {feedback.state}</p>
                            <p><strong>Date:</strong> {feedback.date}</p>
                            <p><strong>Rating:</strong> {feedback.rating}</p>
                            <p><strong>Feedback:</strong> {feedback.comment}</p>
                            <p><strong>Approved:</strong> {feedback.approved ? 'Yes' : 'No'}</p>
                            {feedback.imageUrl && (
                                <div className="feedback-manager-image-container">
                                    <img src={feedback.imageUrl} alt="Feedback" className="feedback-manager-image" />
                                    <button
                                        onClick={() => handleRemoveImage(feedback.id, feedback.imageUrl)}
                                        className="feedback-manager-remove-image-button"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => toggleApproval(feedback.id, feedback.approved)}
                                className={feedback.approved ? "feedback-manager-disapprove-button" : "feedback-manager-approve-button"}
                            >
                                {feedback.approved ? 'Disapprove' : 'Approve'}
                            </button>
                            <button
                                onClick={() => handleDelete(feedback.id, feedback.imageUrl)}
                                className="feedback-manager-delete-button"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No feedback found.</p>
            )}
        </div>
    );
};

export default FeedbackManager;
