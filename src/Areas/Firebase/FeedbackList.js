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
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000    ,
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
