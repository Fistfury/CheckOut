const stripe = require("../utils/initStripe");
const fs = require("fs").promises;

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

const createStripeCheckout = async (req, res) => {
  const { items, customerId, pickupLocation } = req.body;

  if (!customerId) {
    return res.status(400).json({ error: "No customer ID provided" });
}


  try {
    const lineItems = items.map(item =>({
      price_data: {
        currency: 'sek',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.unit_amount,
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/checkout-canceled`,
      customer: customerId,
      metadata: {pickupLocation},
      allow_promotion_codes: true,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json("Error in creating checkout session");
  }
};

const verifySession = async (req, res) => {

  const { sessionId } = req.body;
  try {

    const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

      const products = lineItems.data.map(item => ({
        name: item.description,
        quantity: item.quantity,
        unit_price: item.price.unit_amount /100,
      }));

      const pickupLocation = session.metadata.pickupLocation;

      const order = {
        orderNumber: Math.floor(Math.random() * 100000000),
        date: new Date().toISOString(),
        customerEmail: session.customer_details.email,
        customerId: session.customer,
        pickupLocation: pickupLocation, 
        products: products.map(p => ({ 
          product: {
            name: p.name,
            unit_amount: p.unit_price,
          },
          quantity: p.quantity
        })),
        total: session.amount_total / 100, 
      }
      const ordersData = await fs.readFile("./data/orders.json");
      const orders = JSON.parse(ordersData);
      orders.push(order);
      await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 2));

      res.status(200).json({ verified: true });
    } else {
      res.status(400).json({ verified: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).send("Error during payment verification.");
  }
}
module.exports = {
  getProducts,
  createStripeCheckout,
  verifySession
};
