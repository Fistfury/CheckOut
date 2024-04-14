import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Order } from "../models/interface.model";

export const UserProfile = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const {
    state: { isAuthenticated, user },
  } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log("Authenticated:", isAuthenticated);
  console.log("User:", user);
  console.log("Stripe ID:", user?.stripeId);

  useEffect(() => {
    const fetchOrders = async () => {
     
      if (isAuthenticated && user?.stripeId) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:3000/api/orders/${user.stripeId}`);
         
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching orders:", error);
          setLoading(false);
        }
      }
    };

    fetchOrders();
}, [isAuthenticated, user?.stripeId]);
  if (loading) {
    return (
      <div className="flex justify-center items-center text-beard-dark h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-serif font-bold text-beard-dark mb-5">
        Your Orders
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-6xl">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-beard-cream rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 font-serif text-beard-dark">
              <h3 className="text-lg font-bold mb-2">
                Order Number: {order.orderNumber}
              </h3>
              <p className="text-sm mb-1">
                <span className="font-bold">Customer:</span>{" "}
                {order.customerEmail}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Pickup location:</span>{" "}
                {order.pickupLocation}
              </p>
              <p className="text-sm mb-1">
                <span className="font-bold">Total:</span>{" "}
                {order.total.toFixed(2)} SEK
              </p>
              <ul className="mt-4">
                {order.products.map((product, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between py-1 border-b border-beard-grey"
                  >
                    <span className="font-semibold">
                      {product.product.name}
                    </span>
                    <span>x{product.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
