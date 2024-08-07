import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Slider from 'react-slick';
import './Feedbackstyle.css';  // Importa o arquivo CSS

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'feedback'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setFeedbacks(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });

        return () => unsubscribe();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,  // Adiciona setas de navegação
    };

    return (
        <div>
            <h2 className="feedback-title">Feedbacks</h2>
            <Slider {...settings}>
                {feedbacks.map(({ id, data }) => (
                    <div key={id} className="feedback-container">
                        <p><strong>ID:</strong> {data.id}</p>
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>City:</strong> {data.city}</p>
                        <p><strong>State:</strong> {data.state}</p>
                        <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</p>
                        <p><strong>Rating:</strong> {data.rating}</p>
                        <p><strong>Approved:</strong> {data.approved ? 'Yes' : 'No'}</p>
                        <p><strong>Comment:</strong> {data.comment}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FeedbackList;
