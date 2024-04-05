const fetchUsers = require("../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const initStripe = require("../utils/initStripe");

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
    const stripe = initStripe();
    const stripeCustomer = await stripe.customer.create({ email });

    const newUser = {
      email,
      password: haschedPassword,
      stripeId: stripeCustomer.id,
    };
    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    res.status(201).json("User registered");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await fetchUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Wrong password or no user");
  }
  res.send("Logged in successfully");
};

module.exports = { register, login };
