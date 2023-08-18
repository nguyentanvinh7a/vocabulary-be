const CognitoJwtVerifier = require("aws-jwt-verify").CognitoJwtVerifier;

const ROLE_LIST = require('../../config/roles_list');

const cognitoJwtVerifier = new CognitoJwtVerifier({
    userPoolId: "ap-southeast-1_P5gSpN7to",
    tokenUse: "access",
    clientId: "4n0aq1f9rmn0bvrum0ts33igaj",
});

exports.isAuth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = await cognitoJwtVerifier.verify(token);
        req.userId = decoded.sub;
        req.user = decoded.username;
        req.roles = decoded['cognito:groups']?.includes(ROLE_LIST.ADMIN) ? [ROLE_LIST.ADMIN] : [ROLE_LIST.USER];
        next();
    } catch (err) {
        return res.status(401).json({ msg: err.message });
    }
};