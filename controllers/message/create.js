const Message = require('../../models/Message');
const User = require('../../models/User');
const mongoose = require('mongoose');

exports.createMessage = async (req, res) => {
    const { message, receiver } = req.body;
    const sender = req.user.id;
    const receiverId = mongoose.Types.ObjectId(receiver);
    const receiverUser = await User.findById(receiverId);
    if (!receiverUser || receiverUser === null) {
        return res.status(400).send({ Message: 'Invalid Receiver' });
    }
    if (message === '' || message === null || message === undefined) {
        return res.status(400).send({ Message: 'Invalid Message' });
    }
    if (!sender || sender === '' || sender === null || sender === undefined) {
        return res.status(400).send({ Message: 'Invalid Sender' });
    }
    const newMessage = new Message({
        message,
        sender,
        receiver,
        time: Date.now()
    });
    await newMessage.save();
    res.status(200).send({ message: 'Message sent successfully' });
};