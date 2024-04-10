const fetchUsers = require("../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const stripe = require("../utils/initStripe");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const users = await fetchUsers();
    const userAlreadyExists = users.find((u) => u.email === email);

    if (userAlreadyExists) {
      return res.status(400).json("User already exists");
    }

    const haschedPassword = await bcrypt.hash(password, 12);

    const stripeCustomer = await stripe.customers.create({
      email,
      description: `Customer for ${email}`,
    });

    console.log("Stripe customer created:", stripeCustomer);

    const newUser = {
      email,
      password: haschedPassword,
      stripeId: stripeCustomer.id,
    };
    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    console.log("New users added:", newUser);

    res.status(201).json({
      message: "User registered successfully.",
      stripeId: stripeCustomer.id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ error: "Error registering user.", details: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await fetchUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ error: "User does not exist." });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ error: "Wrong password." });
  }

  res.json({
    message: "Logged in successfully",
    stripeId: user.stripeId,
  });
};
module.exports = { register, login };
