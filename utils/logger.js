const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
require("winston-daily-rotate-file");

const rotatingFilesLogTransport = new transports.DailyRotateFile({
  filename: `${__dirname}/../logs/lms-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
});

rotatingFilesLogTransport.on("rotate", function (oldFilename, newFilename) {
  // do something fun
});

const centralFileLogTransport = new transports.File({
  level: "info",
  filename: `${__dirname}/../logs/lms.log`,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 1,
});

const consoleLogTransport = new transports.Console({
  level: "debug",
  handleExceptions: true,
  json: false,
  colorize: true,
});

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = new createLogger({
  format: combine(label({ label: "LOG" }), timestamp(), myFormat),
  transports: [
    rotatingFilesLogTransport,
    centralFileLogTransport,
    consoleLogTransport,
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
