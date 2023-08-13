const AWS = require('../../config/aws-config');

const cognitoIdentity = new AWS.CognitoIdentityServiceProvider();

exports.register = async (req, res) => {
    const { username, password, email, name, imageLink } = req.body;

    const params = {
        ClientId: '6r6ognmeb5eg8j17r2as4bl3jp',
        Password: password,
        Username: username,
        UserAttributes: [
            {
                Name: 'email',
                Value: email
            },
            {
                Name: 'name',
                Value: name
            },
            {
                Name: 'picture',
                Value: imageLink
            }
        ]
    };

    cognitoIdentity.signUp(params, (err, data) => {
        if (err) {
            console.error('Error during user registration:', err);
            res.status(500).json({
                message: 'Error during user registration',
                error: err
            });
        } else {
            console.log('User registration successful:', data);
            const addUserToGroupParams = {
                GroupName: 'user',
                UserPoolId: 'ap-southeast-1_u3Icfwd8T',
                Username: username
            };

            cognitoIdentity.adminAddUserToGroup(addUserToGroupParams, (err, data) => {
                if (err) {
                    console.error('Error during adding user to group:', err);
                    res.status(500).json({
                        message: 'Error during adding user to group',
                        error: err
                    });
                } else {
                    console.log('User added to group successful:', data);
                }
            });

            res.status(200).json({
                message: 'User registration successful',
                data: data
            });
        }
    });

};
