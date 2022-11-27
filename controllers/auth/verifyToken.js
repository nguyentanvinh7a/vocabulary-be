const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded.username;
        req.roles = decoded.roles;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};