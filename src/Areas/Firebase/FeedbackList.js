// src/Areas/Firebase/FeedbackList.js

import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Slider from 'react-slick';
import './Feedbackstyle.css';  // Importa o arquivo CSS

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        // Filtro para itens aprovados com uma nova abordagem para a query
        const q = query(
            collection(db, 'feedback'),
            where('approved', '==', true)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                setFeedbacks(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            } else {
                setFeedbacks([]);  // Define a lista como vazia se não houver documentos
            }
        });

        return () => unsubscribe();
    }, []);

    const settings = {
        dots: true,
        infinite: feedbacks.length > 1,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: feedbacks.length > 1,
        autoplaySpeed: 5000,
    };

    return (
        <div>
            <Slider {...settings}>
                {feedbacks.map(({ id, data }) => (
                    <div key={id} className="feedback-container">
                        <h3 className="feedback-title">{data.name}, from {data.city}, {data.state}</h3>
                        <p className="feedback-comment">{data.comment}</p>
                        <div className="feedback-rating">
                            {[...Array(data.rating)].map((_, index) => (
                                <span key={index} className="star">★</span>
                            ))}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FeedbackList;
