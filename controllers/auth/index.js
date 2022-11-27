module.exports = {
    ...require('./register'),
    ...require('./login'),
    ...require('./verifyToken'),
    ...require('./verifyRoles')
};