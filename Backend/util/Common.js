class Common {
  static customFormatErrorFn(err, body) {
    let [code, message] = err.message.split("$;$");
    if (message && message.length > 0)
      return {
        code: code,
        message: message,
        extensions: { code: code },
      };
    else if (process.env.BUILD !== "production")
      return {
        code: "DEV_ERROR",
        message: code,
      };
    else {
      log.error("############## Printing REQUEST START ##############");
      log.error(body);
      log.error("############## Printing REQUEST END ##############");
      log.error(code, err);
      return {
        code: "INTERNAL_ERROR",
        message: "Internal Error!",
      };
    }
  }
}

exports = module.exports = Common;
