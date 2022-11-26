const User = require('../../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    User.findOne({ username: req.body.username }, function (err, postUser) {
        if (err) {
            res.status(401).send({ err });
        } else {
            if (!postUser) {
                const hashedPassword = bcrypt.hashSync(req.body.password, 8);
                const user = new User({
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email,
                    image: req.body.image,
                    password: hashedPassword,
                });
                user.save(function (err, newUser) {
                    if (err) {
                        console.log(err);
                        res.status(401).send({ err });
                    } else {
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false,
                            type: "oauth2",
                            auth: {
                                user: "nguyentanvinh2911@gmail.com",
                                pass: "gxzjvxrcwxhnmjwl"
                            }
                        });
                        const email = req.body.email;
                        var mailOptions = {
                            from: 'nguyentanvinh2911@gmail.com',
                            to: email,
                            subject: 'Account Created Successfully!!',
                            html: '<h3>Your account successfully created on Vocabulary!!</h3> <br><br><strong> Email:</strong> ' + req.body.email + '<br><strong> Password:</strong> ' + req.body.password
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        let payload = {
                            id: newUser._id,
                            username: newUser.username,
                            name: newUser.name,
                            email: newUser.email,
                            image: newUser.image,

                        };
                        let id = newUser._id;
                        let token = jwt.sign(payload, 'secretkey');
                        let name = newUser.name;
                        let username = newUser.username;
                        res.status(200).send({ token, id, name, username });
                    }
                });
            } else {
                res.status(401).send({ Message: 'User has an account already' });
            }
        }
    });
};