const AWS = require("../../config/aws-config");

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    const params = {
        AuthFlow: "REFRESH_TOKEN_AUTH",
        ClientId: "6r6ognmeb5eg8j17r2as4bl3jp",
        AuthParameters: {
            REFRESH_TOKEN: refreshToken,
        },
    };

    cognitoIdentityServiceProvider.initiateAuth(params, (err, data) => {
        if (err) {
            console.error("Error during user authentication:", err);
            res.status(500).json({
                message: "Error during user authentication",
                error: err,
            });
        } else {
            console.log("User authentication successful:", data);
            res.status(200).json({
                message: "User authentication successful",
                data: data,
            });
        }
    });
};