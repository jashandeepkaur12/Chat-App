const {
  Conversation,
  Message,
  User,
  getUserByFilter,
} = require("../models/messages_model");
const { randomUUID } = require("crypto");

const LandingController = (req, res) => {
  res.send("hello");
};

const UserRegistration = (req, res) => {
  User.find({ isAdmin: true })
    .then((records, err) => {
      if (records.length == 0) {
        const user = new User({
          email: req.body.email,
          name: req.body.name,
          _id: randomUUID(),
          isAdmin: true,
          createdOn: Math.floor(Date.now() / 1000),
        });
        user.save();
        res.send({ user: user });

        return;
      }

      const admin = records[0];

      if (req.body.email === admin.email) {
        res.send({ user: admin });
        return;
      }

      User.find({ email: req.body.email }).then((record, err) => {
        let user;
        if (record.length == 0) {
          user = new User({
            email: req.body.email,
            name: req.body.name,
            _id: randomUUID(),
            isAdmin: req.body.isAdmin,
            createdOn: Math.floor(Date.now() / 1000),
          });
          user.save();

          const conversation = new Conversation({
            _id: randomUUID(),
            lastMessage: "",
            lastMessageSentOn: 0,
            unReadCount: 0,
            users: [admin, user],
          });

          conversation.save();
        } else {
          user = record[0];
        }
        res.send({ user: user });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ err: err });
    });
};

const SendMessage = (req, res) => {
  const message = new Message({
    conversationId: req.body.conversationId,
    _id: randomUUID(),
    body: req.body.body,
    senderId: req.body.senderId,
    recieverId: req.body.recieverId,
    createdOn: Math.floor(Date.now() / 1000),
  });

  message.save();

  Conversation.updateMany(
    { _id: req.body.conversationId },
    {
      $set: {
        lastMessage: req.body.body,
        lastMessageSentOn: Math.floor(Date.now() / 1000),
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  res.end();
};

const GetConversations = (req, res) => {
  Conversation.find({ "users._id": req.query.userId })
    .then((conversation, err) => {
      res.send({ conversations: conversation });
    })
    .catch((err) => {
      res.status(400).send({ err: err });
    });
};

const GetMessages = (req, res) => {
  Message.find({ conversationId: req.query.conversationId })
    .then((messages, err) => {
      res.send({ messages: messages });
    })
    .catch((err) => {
      res.status(400).send({ err: err });
    });
};

module.exports = {
  LandingController,
  UserRegistration,
  SendMessage,
  GetConversations,
  GetMessages,
};
