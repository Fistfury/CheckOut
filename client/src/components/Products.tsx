import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Product } from "../models/interface.model";

const apiUrl = import.meta.env.VITE_SESSION_KEY;

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/stripe/products`
        );

        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="bg-beard-cream rounded-lg shadow-lg overflow-hidden group"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <div className="p-4 font-serif text-beard-dark">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="hidden sm:block text-sm">{product.description}</p>
            <p className="text-lg">
              {(product.default_price.unit_amount / 100).toFixed(2)} kr
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-beard-orange hover:bg-beard-deep-brown text-white font-bold py-2 px-4 rounded"
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
