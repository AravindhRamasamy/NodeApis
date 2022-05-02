let winston = require('winston');
let { combine, timestamp, printf, colorize } = winston.format;


let customFormat = printf(info => {
    return `${info.timestamp} [${info.level}] : ${info.message}`;
});

const logger = winston.createLogger({
    level: 0,
    format: combine(
        timestamp(),
        colorize(),
        customFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});

module.exports = {
    logger
};
