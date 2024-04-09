import { Link } from "react-router-dom";
import { Navigation } from "../utils/Navigation";

export const Header = () => {
    return (
        <header className="bg-beard-dark text-white text-center p-6 font-serif">
            <Navigation />
            <h1 className="text-4xl font-bold hover:text-beard-orange"><Link to="/">BeardCrafters</Link></h1>
            <p className="text-beard-cream text-xl">Craft Your Signature Style</p>
        </header>
    );
};