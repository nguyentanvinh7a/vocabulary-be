const AWS = require("../../config/aws-config");

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: "6r6ognmeb5eg8j17r2as4bl3jp",
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    };

    cognitoIdentityServiceProvider.initiateAuth(params, (err, data) => {
        if (err) {
            console.error("Error during user login:", err);
            res.status(500).json({
                message: "Error during user login",
                error: err,
            });
        } else {
            console.log("User login successful:", data);
            res.status(200).json({
                message: "User login successful",
                data: data,
            });
        }
    });
};
