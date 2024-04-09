const stripe = require("../utils/initStripe");

const getProducts = async (req, res) => {
  try {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products from Stripe:", error.message);
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

module.exports = {
  getProducts
};
