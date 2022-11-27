exports.verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const rolesArray = [...allowedRoles];
        const isAllowed = rolesArray.some((role) => req.roles.includes(role));
        if (isAllowed) {
            next();
        } else {
            return res.status(403).send({ message: 'Forbidden' });
        }
    };
}