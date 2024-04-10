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

const createStripeCheckout = async (req, res) => {
  const { items, customerId } = req.body;

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
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/canceled`,
      customer: customerId,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json("Error in creating checkout session");
  }
};

const addStripeOrder = async (sessionId) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  if (session.payment_status === 'paid') {
    const newOrder = {
      orderId: session.id,
      customerId: session.customer,
      items: session.line_items.data.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit_price: item.amount_total / 100,
      })),
      total: session.amount_total / 100,
      date: new Date().toISOString(),
    }
    const orders = JSON.parse(await fs.readFile("./data/orders.json"));
        orders.push(newOrder);
        await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));
  }
};

module.exports = {
  getProducts,
  createStripeCheckout,
  addStripeOrder
};
