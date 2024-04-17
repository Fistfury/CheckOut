const validateUser = (req, res) => {
    if (req.session && req.session.userId) {
        return res.json({ isAuthenticated: true, user: { userId: req.session.userId } });
      } else {
         res.json({ isAuthenticated: false});
      }
    };

module.exports = { validateUser }