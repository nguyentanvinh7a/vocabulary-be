const jwt = require('jsonwebtoken');

const ROLE_LIST = require('../../config/roles_list');


exports.isAuth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.decode(token, { complete: true }).payload;
        req.userId = decoded.sub;
        req.user = decoded.username;
        req.roles = decoded['cognito:groups']?.includes(ROLE_LIST.ADMIN) ? [ROLE_LIST.ADMIN] : [ROLE_LIST.USER];
        next();
    } catch (err) {
        console.error("err", err);
        return res.status(401).json({ msg: err.message });
    }
};