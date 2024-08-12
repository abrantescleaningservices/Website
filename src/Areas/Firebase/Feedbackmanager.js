// src/Areas/Firebase/FeedbackManager.js

import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'feedback', id));
            setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
            alert('Feedback deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar feedback: ', error);
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
            console.error('Erro ao atualizar aprovação: ', error);
        }
    };

    return (
        <div className="feedback-manager-container">
            <h1 className="feedback-manager-title">Lista de Feedbacks</h1>
            {feedbacks.length > 0 ? (
                <ul className="feedback-manager-list">
                    {feedbacks.map(feedback => (
                        <li key={feedback.id} className="feedback-manager-item">
                            <p><strong>Nome:</strong> {feedback.name}</p>
                            <p><strong>Cidade:</strong> {feedback.city}</p>
                            <p><strong>Estado:</strong> {feedback.state}</p>
                            <p><strong>Data:</strong> {feedback.date}</p>
                            <p><strong>Avaliação:</strong> {feedback.rating}</p>
                            <p><strong>Comentário:</strong> {feedback.comment}</p>
                            <p><strong>Aprovado:</strong> {feedback.approved ? 'Sim' : 'Não'}</p>
                            <button
                                onClick={() => toggleApproval(feedback.id, feedback.approved)}
                                className={feedback.approved ? "feedback-manager-disapprove-button" : "feedback-manager-approve-button"}
                            >
                                {feedback.approved ? 'Disapprove' : 'Approve'}
                            </button>
                            <button
                                onClick={() => handleDelete(feedback.id)}
                                className="feedback-manager-delete-button"
                            >
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum feedback encontrado.</p>
            )}
        </div>
    );
};

export default FeedbackManager;
