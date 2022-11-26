const mongoose = require('mongoose');
const Message = require('../../models/Message');

exports.listMessage = async (req, res) => {
    const sender = req.user.id;
    const senderId = mongoose.Types.ObjectId(sender);
    const messages = await Message.aggregate([
        {
            $match: {
                $or: [
                    {
                        sender: senderId
                    },
                    {
                        receiver: senderId
                    }
                ]
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'sender',
                foreignField: '_id',
                as: 'sender'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'receiver',
                foreignField: '_id',
                as: 'receiver'
            }
        },
        {
            $unwind: '$sender'
        },
        {
            $unwind: '$receiver'
        },
        {
            $project: {
                _id: 1,
                message: 1,
                time: 1,
                sender: {
                    _id: 1,
                    name: 1,
                    email: 1
                },
                receiver: {
                    _id: 1,
                    name: 1,
                    email: 1
                }
            }
        }
    ]);
    return res.status(200).send({ Message: 'List of messages', messages });
};