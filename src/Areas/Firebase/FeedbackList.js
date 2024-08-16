import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Slider from 'react-slick';
import Modal from 'react-modal';
import './Feedbackstyle.css';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
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
                setFeedbacks([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage('');
    };

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
                        {data.imageUrl && (
                            <div
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => openModal(data.imageUrl)}
                            >
                                <img src={data.imageUrl} alt="Feedback" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px', marginTop: '10px' }} />
                            </div>
                        )}
                    </div>
                ))}
            </Slider>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#f6f0e4',
                        padding: '20px',
                        borderRadius: '10px'
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                }}
            >
                <button className="custom-modal-close-button" onClick={closeModal} style={{ marginBottom: '10px' }}>Close</button>
                <img src={selectedImage} alt="Feedback" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '10px' }} />
            </Modal>
        </div>
    );
};

export default FeedbackList;
