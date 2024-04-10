const fs = require("fs").promises;

const getOrders = async (req, res) => {
    try {
        const orders = JSON.parse(await fs.readFile("../data/orders.json"));
        const userOrders = orders.filter(order => order.customerId === req.userId);
        res.status(200).json(userOrders)
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Unable to retrive orders.")
    }
}

module.exports = getOrders 