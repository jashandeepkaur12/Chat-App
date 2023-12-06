const {
  GetConversations,
  GetMessages,
  LandingController,
  UserRegistration,
  SendMessage,
} = require("./controller/controller");

const ExtractMetadata = require("./middlewares/MetaDataExtractor");
const UserRegistrationClass = require("./middlewares/validators/UserRegistration");

exports =
  module.exports =
  PrepareRoutes =
    (router) => {
      router.get("/", [ExtractMetadata.extractor], (req, res) => {
        LandingController(req, res);
      });

      router.post(
        "/user/register",
        [
          ExtractMetadata.extractor,
          (req, res, next) => new UserRegistrationClass(req, res, next),
        ],
        (req, res) => {
          UserRegistration(req, res);
        }
      );

      router.post("/message/send", (req, res) => {
        SendMessage(req, res);
      });

      router.get("/messages", (req, res) => {
        GetMessages(req, res);
      });

      router.get("/conversations", (req, res) => {
        GetConversations(req, res);
      });
    };
