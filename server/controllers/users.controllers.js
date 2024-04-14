const fetchUsers = require("../utils/fetchUsers")


const getUsers = async (req, res) => {

    const users = await fetchUsers()

    if (!users || users.length <= 0) {
        return res.status(400).json("No users found")
    }

    res.status(200).json(users)
}
const findUserById = async (id) => {
    const users = await fetchUsers();
    return users.find(user => user.id === id);
};

const getCustomerInfo = async (req, res) => {
   
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    const user = await findUserById(req.session.userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ stripeId: user.stripeId });
};

module.exports = { getUsers, getCustomerInfo }