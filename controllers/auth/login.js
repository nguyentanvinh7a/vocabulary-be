const User = require('../../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    User.findOne({ username: req.body.username }, function (err, postUser) {
        if (err) {
            res.status(401).send({ err });
        } else {
            if (postUser) {
                if (bcrypt.compareSync(req.body.password, postUser.password)) {
                    let payload = {
                        id: postUser._id,
                        username: postUser.username,
                        name: postUser.name,
                        email: postUser.email,
                        image: postUser.image,
                    };
                    let id = postUser._id;
                    let token = jwt.sign(payload, 'secretkey');
                    let name = postUser.name;
                    let username = postUser.username;
                    res.status(200).send({ token, id, name, username });
                } else {
                    res.status(401).send({ Message: 'Invalid Password' });
                }
            } else {
                res.status(401).send({ Message: 'Invalid Username' });
            }
        }
    });
};