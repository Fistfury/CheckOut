import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export const Footer = () => {
    return (
        <footer className="bg-beard-brown text-beard-cream text-center p-4 flex flex-col items-center justify-center space-y-4 font-serif">
        <p className="text-base md:text-lg">© 2024 BeardCrafters. All rights reserved.</p>
        <div className="flex space-x-4">
            <a href="https://instagram.com" className="text-2xl hover:text-beard-orange">
                <FaInstagram />
            </a>
            <a href="https://facebook.com" className="text-2xl hover:text-beard-orange">
                <FaFacebook />
            </a>
            <a href="https://twitter.com" className="text-2xl hover:text-beard-orange">
                <FaX /> 
            </a>
        </div>
    </footer>
    )
};