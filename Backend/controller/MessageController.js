const { Message, Conversation } = require("../models/messages_model");
const { customFormatErrorFn } = require("../util/Common");
const { randomUUID } = require("crypto");

const SendMessage = (body) => {
  try {
    const message = new Message({
      conversationId: body.conversationId,
      _id: randomUUID(),
      body: body.body,
      senderId: body.senderId,
      recieverId: body.recieverId,
      createdOn: Math.floor(Date.now() / 1000),
    });

    message.save();

    Conversation.updateMany(
      { _id: body.conversationId },
      {
        $set: {
          lastMessage: body.body,
          lastMessageSentOn: Math.floor(Date.now() / 1000),
        },
      }
    ).catch((err) => {
      throw err;
    });

  } catch (error) {
    const errorObj = customFormatErrorFn(error, null);
  }
};

exports = module.exports = SendMessage;
