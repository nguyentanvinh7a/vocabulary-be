const User = require('../../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    User.findOne({ username: req.body.username }, async function (err, postUser) {
        if (err) {
            return res.status(401).send({ err });
        } else {
            if (postUser) {
                if (bcrypt.compareSync(req.body.password, postUser.password)) {
                    let payload = {
                        id: postUser._id,
                        username: postUser.username,
                        name: postUser.name,
                        email: postUser.email,
                        imageLink: postUser.imageLink,
                        roles: postUser.roles
                    };
                    let token = jwt.sign(payload, 'secretkey');
                    return res.status(200).send({ token, ...postUser._doc });
                } else {
                    return res.status(401).send({ Message: 'Invalid Password' });
                }
            } else {
                return res.status(401).send({ Message: 'Invalid Username' });
            }
        }
    });
};