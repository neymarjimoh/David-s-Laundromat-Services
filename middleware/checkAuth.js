const  jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '');
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    try {
        var decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Not authorized to access this resource!'
        })
    }
}