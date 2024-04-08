import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export const Footer = () => {
    return (
        <footer className="bg-beard-grey text-white text-center p-2 flex flex-col items-center justify-center space-y-2">
            <p className="text-sm">© 2024 BeardCrafters. All rights reserved.</p>
            <div className="flex space-x-2">
                <a href="https://instagram.com" className="hover:text-beard-orange"><FaInstagram /></a>
                <a href="https://facebook.com" className="hover:text-beard-orange"><FaFacebook /></a>
                <a href="https://twitter.com" className="hover:text-beard-orange"><FaX /></a>
            </div>
        </footer>
    );
};