const { v4: uuidv4 } = require("uuid");

class ExtractMetadata {
  static extractor(req, res, next) {
    const ctx = {};
    ctx.agent = req.header("agent");
    ctx.timeZone = req.header("Timezone");
    ctx.offset = req.header("Offset");
    ctx.requestID = uuidv4();

    req.ctx = ctx;
    next();
  }
}

exports = module.exports = ExtractMetadata;
