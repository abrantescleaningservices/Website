import React, {useRef} from 'react';
import {useState} from 'react';
import {FaCopy} from 'react-icons/fa';
import cabecalhoImage from '../../Images/cabecalhoImage.png';
import SmokeRightSide from '../../Images/SmokeRightSide.png';
import SmokeLeftSide from '../../Images/SmokeLeftSide.png';
import aboutUsBackground from '../../Images/AboutUsBackground.png'
import whyUsImage from '../../Images/WhyUs.jpeg';
import OurService1 from '../../Images/OurServices1.jpeg';
import OurService2 from '../../Images/OurServices2.png';
import OurService3 from '../../Images/OurServices3.jpeg';

function Home() {
    const experience_image_url = 'https://cleanmypremises.ca/wp-content/uploads/2021/04/woman-with-gloves-cleaning-solution-disinfecting-gym-equipment.jpg'
    const targetDivRefAboutUs = useRef(null);
    const targetDivRefOurServices = useRef(null);
    const targetDivRefWhyUs = useRef(null);
    const targetDivRefContact = useRef(null);

    const [phoneCopied, setPhoneCopied] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const handleCopyPhone = () => {
        navigator.clipboard.writeText('+1 (475) 377-2482');
        setPhoneCopied(true);
        setTimeout(() => {
            setPhoneCopied(false);
        }, 2000);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('contact@kakuscleaning.com');
        setEmailCopied(true);
        setTimeout(() => {
            setEmailCopied(false);
        }, 2000);
    };


    function scrollToTargetDivAboutUs() {
        targetDivRefAboutUs.current.scrollIntoView({behavior: 'smooth'});
    }

    function scrollToTargetDivOurServices() {
        targetDivRefOurServices.current.scrollIntoView({behavior: 'smooth'});
    }

    function scrollToTargetDivWhyUs() {
        targetDivRefWhyUs.current.scrollIntoView({behavior: 'smooth'});
    }

    function scrollToTargetDivContact() {
        targetDivRefContact.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div style={{backgroundColor: '#E8E7E7'}}>

            <div className='row' style={{display: "flex", justifyContent: "space-between"}}>
                <div className="titleOptions">
                    <div onClick={scrollToTargetDivAboutUs} className="buttonTitleAboutUs">About
                        Us
                    </div>
                    <div onClick={scrollToTargetDivOurServices} className="buttonTitleOurServices">Our
                        Services
                    </div>
                    <div onClick={scrollToTargetDivWhyUs} className="buttonTitleWhyUs">Why Us?
                    </div>
                    <div onClick={scrollToTargetDivContact} className="buttonTitleContact">
                        Contact
                    </div>

                    <div className="contactInfo" style={{marginLeft: '15px', display: 'flex', flexDirection: 'column'}}>
                        <span>+(203)800-1266</span>
                        <span>@abrantescleaningservices</span>
                    </div>
                </div>
            </div>


            <div className='container'>

                <div
                    className='smokeSideL'
                    style={{
                        backgroundImage: `url(${SmokeLeftSide})`,
                    }}
                />
                <div className='title' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '50px'
                }}>
                    <div className="CabecalhoImage"
                         style={{
                             backgroundImage: `url(${cabecalhoImage})`
                         }}
                    />
                    <div className='titleSubText' style={{color: "black"}}  ref={targetDivRefAboutUs}>
                        We are a professional cleaning company specializing in providing top-notch
                        cleaning services to commercial and residential properties.
                    </div>
                </div>

                <div
                    className='smokeSideR'
                    style={{
                        backgroundImage: `url(${SmokeRightSide})`,
                    }}
                />
            </div>


            <div className='aboutUsCard'
                 style={{backgroundImage: `url(${aboutUsBackground})`, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                <div className='titleTextAboutUs'>About Us</div>
                <div className='titleSubTextAboutUs'>
                    Our team of trained and experienced cleaners are dedicated to making your space spotless and leaving
                    you with a sense of peace and comfort.
                </div>
            </div>

            <div ref={targetDivRefOurServices} className="OurServicesTitleText">
                Our Services
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-around', // Distribute space evenly between child elements
            }}>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column', // Stack child elements vertically
                        alignItems: 'center', // Center child elements horizontally
                        width: '80px' // Set a fixed width for the parent div
                    }}
                >
                    <div className="OurServicesImages" style={{backgroundImage: `url(${OurService1})`}}></div>
                    <div className="OurServicesText">Mirror Cleaning</div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column', // Stack child elements vertically
                        alignItems: 'center', // Center child elements horizontally
                        width: '80px' // Set a fixed width for the parent div
                    }}
                >
                    <div className="OurServicesImages" style={{backgroundImage: `url(${OurService2})`}}></div>
                    <div className="OurServicesText">Commercial Cleaning</div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column', // Stack child elements vertically
                        alignItems: 'center', // Center child elements horizontally
                        width: '80px' // Set a fixed width for the parent div
                    }}
                >
                    <div className="OurServicesImages" style={{backgroundImage: `url(${OurService3})`}}></div>
                    <div className="OurServicesText">Vacuum Cleaning</div>
                </div>
            </div>

            <div style={{
                marginTop: '15px',
                display: 'flex',
                alignItems: 'start', // Optional: Align items vertically centered
            }}>

                <div className="WhyUsLeftSide"
                     style={{
                         display: 'flex',
                         flexDirection: 'column', // Add flexDirection: 'column' to stack child elements vertically
                     }}
                >
                    <div ref={targetDivRefWhyUs} className="WhyUsTitleText" style={{opacity: '50%'}}>
                        Why Choose Us?
                    </div>

                    <div className="WhyUsImage"
                         style={{
                             backgroundImage: `url(${whyUsImage})`,

                         }}
                    />
                </div>

                <div className="WhyUsGroupCheck">

                    <div style={{

                        display: 'flex',
                        alignItems: 'center', // Optional: Align items vertically centered
                    }}>
                        <div className="WhyUsCheckPoint">
                            &#10003;
                        </div>
                        <div className="WhyUsTextCheck">
                            Trained and experienced cleaners
                        </div>
                    </div>
                    <div style={{
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center', // Optional: Align items vertically centered
                    }}>
                        <div className="WhyUsCheckPoint">
                            &#10003;
                        </div>
                        <div className="WhyUsTextCheck">
                            Commitment regardless of date
                        </div>
                    </div>
                    <div style={{
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center', // Optional: Align items vertically centered
                    }}>
                        <div className="WhyUsCheckPoint">
                            &#10003;
                        </div>
                        <div className="WhyUsTextCheck">
                            Flexible scheduling options
                        </div>
                    </div>
                    <div style={{
                        marginTop: '10px',
                        display: 'flex',
                        alignItems: 'center', // Optional: Align items vertically centered
                    }}>
                        <div className="WhyUsCheckPoint">
                            &#10003;
                        </div>
                        <div className="WhyUsTextCheck">
                            100% satisfaction guarantee
                        </div>
                    </div>

                </div>

            </div>

            <div ref={targetDivRefContact} style={{backgroundColor: '#D9D9D9', height: '140px', marginTop: '25px'}}>
                <div className="AboutUsCollection" style={{paddingTop: '10px'}}>
                    <div style={{fontSize: "15px", marginLeft: '15px', fontWeight: "bold"}}>
                        Contact Us
                    </div>
                    <div style={{fontSize: "10px", marginLeft: '15px', marginTop: '10px'}}>
                        For more information or to schedule a cleaning appointment
                        please contact us at:
                    </div>
                    <div style={{
                        marginTop: '5px',
                        display: 'flex',
                        alignItems: 'center', // Optional: Align items vertically centered
                    }}>
                        <div style={{fontSize: "10px", marginLeft: '15px'}}>
                            Phone:
                        </div>
                        <div
                            style={{
                                fontSize: '10px',
                                marginLeft: '5px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            +1 (475) 377-2482
                            <button
                                style={{
                                    marginLeft: '5px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={handleCopyPhone}
                            >
                                <FaCopy/>
                            </button>
                        </div>
                        {phoneCopied && (
                            <div style={{marginLeft: '5px', fontSize: '10px', color: 'green'}}>
                                Copied!
                            </div>
                        )}
                    </div>

                    <div
                        style={{
                            marginTop: '5px',
                            display: 'flex',
                            alignItems: 'center', // Optional: Align items vertically centered
                        }}
                    >
                        <div style={{fontSize: '10px', marginLeft: '15px'}}>E-mail:</div>
                        <div
                            style={{
                                fontSize: '10px',
                                marginLeft: '3px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            contact@kakuscleaning.com
                            <button
                                style={{
                                    marginLeft: '5px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={handleCopyEmail}
                            >
                                <FaCopy/>
                            </button>
                        </div>
                        {emailCopied && (
                            <div style={{marginLeft: '5px', fontSize: '10px', color: 'green'}}>
                                Copied!
                            </div>
                        )}
                    </div>

                    <div style={{
                        marginTop: '5px',
                        display: 'flex',
                        alignItems: 'center', // Optional: Align items vertically centered
                    }}>
                        <div style={{fontSize: "10px", marginLeft: '15px'}}>
                            From:
                        </div>
                        <div style={{fontSize: "10px", marginLeft: '3px', fontWeight: "bold"}}>
                            Waterbury, CT
                        </div>
                    </div>

                    <div>
                        <a style={{fontSize: "10px", marginLeft: '15px', marginTop: '5px'}}
                           href="https://linktr.ee/kakuscleaning" target="_blank" rel="noopener noreferrer">
                            Access for more Information
                        </a>
                    </div>

                </div>
            </div>


        </div>
    );
}

export default Home;
//   <div className='title' style={{ opacity:'10',  backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundSize: 'cover',backgroundImage : `url(${title_image_url})` }}>
