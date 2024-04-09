import { Link } from "react-router-dom";
import { Navigation } from "../utils/Navigation";
import heroImage from "../images/bathBarberHero.jpg";

export const Header = () => {
    return (
        <header className="relative">
        <Navigation />
        <div
          className="bg-cover bg-center h-48 sm:h-96  sm:bg-top "
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="bg-black bg-opacity-50 flex h-full">
            <div className="m-auto p-4 lg:p-10  text-right">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-beard-cream hover:text-beard-orange">
                <Link to="/">BeardCrafters</Link>
              </h1>
              <p className="text-beard-light-orange text-lg sm:text-xl md:text-2xl">
                Craft Your Signature Style
              </p>
            </div>
          </div>
        </div>
      </header>
    );
};