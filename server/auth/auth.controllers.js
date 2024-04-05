const fetchUsers = require("../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

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

    const haschedPassword = await bcrypt.hash(password, 15);

    const newUser = {
      email,
      password: haschedPassword,
    };
    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    res.status(201).json(newUser.email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register };
