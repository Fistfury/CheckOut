const fs = require("fs").promises;

const getOrders = async (req, res) => {
    const { customerId } = req.params;
    try {
        const ordersData = await fs.readFile("./data/orders.json", "utf-8");
        const orders = JSON.parse(ordersData);
        const userOrders = orders.filter(order => order.customerId === customerId);
        if (userOrders.length === 0) {
            return res.status(404).json({ message: "No orders found." });
        }
        res.status(200).json(userOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Unable to retrieve orders." });
    }
};

module.exports = { getOrders };