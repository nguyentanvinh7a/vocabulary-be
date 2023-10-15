var CognitoJwtVerifier = require("aws-jwt-verify").CognitoJwtVerifier;
var SimpleJwksCache = require("aws-jwt-verify/jwk").SimpleJwksCache;
var SimpleJsonFetcher = require("aws-jwt-verify/https").SimpleJsonFetcher;

var verifier = CognitoJwtVerifier.create(
  {
    userPoolId: "ap-southeast-1_y0cDaGZFP",
    tokenUse: "access",
    clientId: "3905akl8l4aa8tafg0sp3aq457",
  },
  {
    jwksCache: new SimpleJwksCache({
      fetcher: new SimpleJsonFetcher({
        defaultRequestOptions: {
          responseTimeout: 3000,
        },
      }),
    }),
  }
);

const ROLE_LIST = require('../../config/roles_list');


exports.isAuth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = await verifier.verify(token);
        req.userId = decoded.sub;
        req.user = decoded.username;
        req.roles = decoded['cognito:groups']?.includes(ROLE_LIST.ADMIN) ? [ROLE_LIST.ADMIN] : [ROLE_LIST.USER];
        next();
    } catch (err) {
        console.error("err", err);
        return res.status(401).json({ msg: err.message });
    }
};