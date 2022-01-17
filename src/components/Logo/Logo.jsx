import React from "react";
import logoFile from './j2logo.svg';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0 ml5 logoContainer">
            <img style={{height: 150, width: 150}} src={logoFile} alt="J2 Logo" />
        </div>
    );
}

export default Logo;