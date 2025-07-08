import React from 'react';
import './FloatingButtons.css'; // Make sure to create this CSS file

const FloatingButtons = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/9884982465"
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="lab la-whatsapp"></i>
            </a>


            {/* Scroll to Top Button */}
            <div className="scroll-to-top" onClick={scrollToTop}>
                <i class="las la-long-arrow-alt-up"></i>
            </div>
        </>
    );
};

export default FloatingButtons;
