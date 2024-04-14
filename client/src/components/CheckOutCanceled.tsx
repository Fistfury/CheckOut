import { Link } from "react-router-dom";
import { BiXCircle } from "react-icons/bi";

export const CheckoutCanceled = () => {
  return (
    <div className="text-center p-10">
      <BiXCircle className="mx-auto h-12 w-12 text-red-500" />
      <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
        Checkout Canceled
      </h1>
      <p className="mt-2 text-lg">You have canceled the checkout process. No order was placed.</p>
      <Link
        to="/"
        className="mt-4 inline-block bg-beard-dark text-beard-cream px-6 py-2 rounded hover:bg-beard-deep-brown transition duration-300"
      >
        Return to Homepage
      </Link>
    </div>
  );
};