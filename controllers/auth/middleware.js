const jwt = require('jsonwebtoken');
const USER_ROLE = require('../../const/UserRole');

exports.isAuth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.isSuperAdmin = (req, res, next) => {
    if (req.user.userRoleId.role !== USER_ROLE.SUPER_ADMIN) {
        return res.status(401).json({ msg: 'Not authorized as super admin' });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.user.userRoleId.role !== USER_ROLE.ADMIN) {
        return res.status(401).json({ msg: 'Not authorized as admin' });
    }
    next();
};

exports.checkPermission = (checks) => {
    return (req, res, next) => {
        if (checks.includes(req.user.userRoleId.role)) {
            next();
        } else {
            return res.status(401).json({ msg: 'Not authorized' });
        }
    };
};
