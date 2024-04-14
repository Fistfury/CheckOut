const fetchUsers = require("../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const stripe = require("../utils/initStripe");
const { v4: uuidv4 } = require('uuid');

const saveUsers = async (users) => {
  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const users = await fetchUsers();
  const userAlreadyExists = users.find(u => u.email === email);
  if (userAlreadyExists) {
    return res.status(409).send('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 12);

    const stripeCustomer = await stripe.customers.create({
      email,
      description: `Customer for ${email}`,
    });

    

    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      stripeId: stripeCustomer.id,
     
    };
    users.push(newUser);
    await saveUsers(users);
    req.session.userId = newUser.id; 
   
   
  

    res.status(201).json({
      message: "User registered successfully.",
      stripeId: stripeCustomer.id,
      userId: newUser.id
    });
  }
  

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
  req.session.userId = user.id;
  res.json({
    message: "Logged in successfully",
    stripeId: user.stripeId,
    userId: user.id
  });
};
const logout = (req, res) => {
  req.session = null;
  res.json({ message: "Logged out successfully" });
};
module.exports = { register, login, logout };
