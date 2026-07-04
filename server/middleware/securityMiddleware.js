const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const cleanObject = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  for (const key of Object.keys(obj)) {
    if (key.includes("$") || key.includes(".")) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      cleanObject(obj[key]);
    }
  }

  return obj;
};

const sanitizeRequest = (req, res, next) => {
  if (req.body) cleanObject(req.body);
  if (req.params) cleanObject(req.params);
  next();
};

const securityMiddleware = (app) => {
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      crossOriginEmbedderPolicy: false
    })
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200,
      message: {
        message: "Too many requests. Please try again later."
      }
    })
  );

  app.use(sanitizeRequest);
  app.use(hpp());
};

module.exports = securityMiddleware;