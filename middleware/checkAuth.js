const  jwt = require('jsonwebtoken');
const { unsecureRoutes } = require("../constants/routes.constants");
const { JWT_SECRET } = require('../config/config');

module.exports = (req, res, next) => {
    if (unsecureRoutes.includes(req.path)) {
        return next();
    } else {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "Access denied, You must be logged in!!" });
        }

        try {
            var decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded.user;
            next();
        } catch (err) {
            return res.status(401).json({
                message: 'You must be logged in!!'
            })
        }
    }
};
