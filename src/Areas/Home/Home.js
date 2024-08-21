import React, { useRef, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import Modal from 'react-modal';
import cabecalhoImage from '../../Images/cabecalhoImage.png';
import petfriendlyImage from '../../Images/petfriendlycard.avif';
import qualityAssurance from '../../Images/qualityassurance.png';
import pontualityImage from '../../Images/pontualityImage.webp';
import feedbackBackground from '../../Images/Feedbacktable.png';
import SmokeRightSide from '../../Images/SmokeRightSide.png';
import SmokeLeftSide from '../../Images/SmokeLeftSide.png';
import aboutUsBackground from '../../Images/AboutUsBackground.png';
import OurService1 from '../../Images/OurServices1.jpg';
import OurService2 from '../../Images/OurServices2.jpg';
import OurService3 from '../../Images/OurServices3.jpg';
import FeedbackForm from '../Firebase/FeedbackForm';
import FeedbackList from '../Firebase/FeedbackList';

Modal.setAppElement('#root');  // Define the root element for accessibility

function Home() {
    const targetDivRefAboutUs = useRef(null);
    const targetDivRefOurServices = useRef(null);
    const targetDivRefFeedBack = useRef(null);
    const targetDivRefWhyUs = useRef(null);
    const targetDivRefContact = useRef(null);

    const [phoneCopied, setPhoneCopied] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleCopyPhone = () => {
        navigator.clipboard.writeText('+1 (203) 800-1266');
        setPhoneCopied(true);
        setTimeout(() => {
            setPhoneCopied(false);
        }, 2000);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('contact@abrantescleaningservices.com');
        setEmailCopied(true);
        setTimeout(() => {
            setEmailCopied(false);
        }, 2000);
    };

    function scrollToTargetDivAboutUs() {
        targetDivRefAboutUs.current.scrollIntoView({ behavior: 'smooth' });
    }

    function scrollToTargetDivOurServices() {
        targetDivRefOurServices.current.scrollIntoView({ behavior: 'smooth' });
    }
  function scrollToTargetDivFeedBack() {
        targetDivRefFeedBack.current.scrollIntoView({ behavior: 'smooth' });
    }

    function scrollToTargetDivWhyUs() {
        targetDivRefWhyUs.current.scrollIntoView({ behavior: 'smooth' });
    }

    function scrollToTargetDivContact() {
        targetDivRefContact.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div style={{backgroundColor: '#E8E7E7'}}>
            <div className='row' style={{display: "flex", justifyContent: "space-between"}}>
                <div className="titleOptions">
                    <div onClick={scrollToTargetDivAboutUs} className="buttonTitleAboutUs no-wrap">About Us</div>
                    <div onClick={scrollToTargetDivFeedBack} className="buttonTitleContact no-wrap">Feedback</div>
                    <div onClick={scrollToTargetDivOurServices} className="buttonTitleOurServices no-wrap">Our Services</div>
                    <div onClick={scrollToTargetDivWhyUs} className="buttonTitleContact no-wrap">Why Us?</div>
                    <div onClick={scrollToTargetDivContact} className="buttonTitleContact no-wrap">Contact</div>
                    <div className="contactInfo" style={{marginLeft: '5px', display: 'flex', flexDirection: 'column'}}>
                        <span className="no-wrap">+(203)800-1266</span>
                        <span                 style={{ cursor: 'pointer' }}       onClick={() => window.open('https://www.instagram.com/abrantescleaningservices/', '_blank')}  className="no-wrap">@abrantescleaningservices</span>
                    </div>
                </div>
            </div>



    <div className='container'>
                <div className='smokeSideL' style={{backgroundImage: `url(${SmokeLeftSide})`}}/>
                <div className='title' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50px'
                }}>
                    <div className="CabecalhoImage" style={{backgroundImage: `url(${cabecalhoImage})`}}/>
                    <div className='titleSubText' style={{color: "black"}} ref={targetDivRefAboutUs}>
                        We are a professional cleaning company specializing in providing top-notch cleaning services to
                        commercial and residential properties.
                    </div>
                </div>
                <div className='smokeSideR' style={{backgroundImage: `url(${SmokeRightSide})`}}/>
            </div>


            <div className='aboutUsCard'
                 style={{backgroundImage: `url(${aboutUsBackground})`, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                <div className='titleTextAboutUs'>About Us</div>
                <div    className='titleSubTextAboutUs'>
                    Our team of trained and experienced cleaners are dedicated to making your space spotless and leaving
                    you with a sense of peace and comfort.
                </div>
            </div>

            <div ref={targetDivRefFeedBack} className='feedBackCard'
                 style={{backgroundImage: `url(${feedbackBackground})`, backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                <div className='titleTextFeedBack'>OUR CLIENTS FEEDBACK</div>
                <div>
                    <FeedbackList/>
                </div>

                <div style={{ cursor: 'pointer' }}  className="leavefeedbackbutton" onClick={() => setModalIsOpen(true)}>Leave Your Feedback</div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        content: {
                            backgroundColor: '#f6f0e4'
                        }
                    }}
                >
                    <button className="back-button" onClick={() => setModalIsOpen(false)}>Close</button>
                    <FeedbackForm closeModal={() => setModalIsOpen(false)}/>
                </Modal>
                <div ref={targetDivRefOurServices} className="FeedBackBottom"></div>

            </div>

            <div className='ourServicesCard'>
            <div  className="OurServicesTitleText">OUR SERVICES</div>
                <div className='ourServicesSpaceCards'>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="OurServicesImages" style={{backgroundImage: `url(${OurService3})`}}></div>
                        <div className="OurServicesText">Residential & Commercial</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="OurServicesImages" style={{backgroundImage: `url(${OurService2})`}}></div>
                        <div className="OurServicesText">Vacuum and mooping floors</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="OurServicesImages" style={{backgroundImage: `url(${OurService1})`}}></div>
                        <div className="OurServicesText"> Window and mirrors cleaning</div>
                    </div>
                </div>
                <div className="OurServicesBottom"></div>
            </div>

            <div ref={targetDivRefWhyUs} className='WhyUsCard'>
                <div className="WhyUs1TitleText">Why should</div>
                <div className="WhyUs3TitleText">you</div>
                <div className="WhyUs2TitleText">Choose</div>
                <div className="WhyUs3TitleText">Us?</div>
                <div className='WhyUsSpaceCards'>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="WhyUsImages" style={{backgroundImage: `url(${petfriendlyImage})`}}></div>
                        <div className="WhyUsText">PET FRIENDLY</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="WhyUsImages2" style={{backgroundImage: `url(${qualityAssurance})`}}></div>
                        <div className="WhyUsText">QUALITY ASSURANCE</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="WhyUsImages" style={{backgroundImage: `url(${pontualityImage})`}}></div>
                        <div className="WhyUsText"> PONTUALITY</div>
                    </div>
                </div>
                <div className="OurServicesBottom"></div>
            </div>

            <div ref={targetDivRefContact} style={{
                backgroundColor: 'white',
                height: 'auto',
                marginTop: '25px',
                padding: '20px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                maxWidth: '100%'
            }}>
                <div className="AboutUsCollection" style={{paddingTop: '60px'}}>
                    <div className="contactTitleText">Contact Us</div>
                    <div className="contactInfoText">
                        For more information or to schedule a cleaning appointment
                        please contact us at:
                    </div>
                    <div className="contactDetail">
                        <div className="contactLabel">Phone:</div>
                        <div className="contactValue">
                            +1 (203) 800-1266
                            <button className="copyButton" onClick={handleCopyPhone}>
                                <FaCopy/>
                            </button>
                        </div>
                        {phoneCopied && (
                            <div className="copyStatus">Copied!</div>
                        )}
                    </div>
                    <div className="contactDetail">
                        <div className="contactLabel">E-mail:</div>
                        <div className="contactValue">
                            contact@abrantescleaningservices.com
                            <button className="copyButton" onClick={handleCopyEmail}>
                                <FaCopy/>
                            </button>
                        </div>
                        {emailCopied && (
                            <div className="copyStatus">Copied!</div>
                        )}
                    </div>
                    <div className="contactSocialMedia">
                        <div className="contactLabel">Instagram:</div>
                        <div  style={{ cursor: 'pointer' }}       onClick={() => window.open('https://www.instagram.com/abrantescleaningservices/', '_blank')} className="contactValue">www.instagram.com/abrantescleaningservices/</div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Home;
