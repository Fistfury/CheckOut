const validateUser = (req, res) => {
    if (req.session.userId) {
        return res.json({ isAuthenticated: true, user: { userId: req.session.userId } });
      } else {
        return res.status(401).json({ isAuthenticated: false, error: "No active session found" });
      }
    };

module.exports = { validateUser }