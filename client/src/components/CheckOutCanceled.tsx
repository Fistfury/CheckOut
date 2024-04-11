import { Link } from "react-router-dom";

export const CheckoutCanceled = () => {
  return (
    <div className="text-center">
      <h1>Checkout Canceled</h1>
      <p>You have canceled the checkout process. No order was placed.</p>
      <Link to="/">Return to Homepage</Link>
    </div>
  );
};