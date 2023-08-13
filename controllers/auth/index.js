module.exports = {
    ...require('./register'),
    ...require('./confirmSignUp'),
    ...require('./refreshToken'),
    ...require('./login'),
    ...require('./verifyToken'),
    ...require('./verifyRoles'),
};