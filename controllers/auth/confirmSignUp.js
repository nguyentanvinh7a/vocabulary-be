const AWS = require("../../config/aws-config");

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

exports.confirmSignUp = async (req, res) => {
    const { username, code } = req.body;

    const params = {
        ClientId: "6r6ognmeb5eg8j17r2as4bl3jp",
        Username: username,
        ConfirmationCode: code,
    };

    cognitoIdentityServiceProvider.confirmSignUp(params, (err, data) => {
        if (err) {
            console.error("Error during user confirmation:", err);
            res.status(500).json({
                message: "Error during user confirmation",
                error: err,
            });
        } else {
            console.log("User confirmation successful:", data);
            res.status(200).json({
                message: "User confirmation successful",
                data: data,
            });
        }
    });
};
