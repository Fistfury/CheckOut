import { FaCheckCircle } from "react-icons/fa";

export const IconicBtn = () => {
    return (
        <button type="submit" className="flex items-center justify-center px-10 py-3 bg-beard-dark hover:bg-beard-darkest text-white rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-beard-light focus:ring-offset-2 transition duration-150 ease-in-out">
        <FaCheckCircle className="text-2xl"/>
        
      </button>
    );
  };
  