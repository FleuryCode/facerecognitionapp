import React from "react";
import logoFile from './j2logo.svg';
import './Logo.css';

const Logo = () => {
    return (
        <a className="logoTag" href="https://j-squaredstudios.com" target={"_blank"}>
            <div className="logoContainer">
            <img style={{height: 150, width: 150}} src={logoFile} alt="J2 Logo" />
        </div>
        </a>
        
    );
}

export default Logo;