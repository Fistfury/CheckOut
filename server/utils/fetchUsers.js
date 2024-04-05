const fs = require("fs").promises;

const fetchUsers = async () => {
  try {
    const data = await fs.readFile("./data/users.json");
    const users = JSON.parse(data);
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to fetch users");
  }
};

module.exports = fetchUsers;
