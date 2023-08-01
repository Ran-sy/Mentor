
// libraries
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const util = require('util');
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), `yyyyMMdd\tHH:mm:ss`)
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir((path.join(__dirname, '..', 'logs')))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (e) {
        console.log(e)
    }
}

const logger = (req, res, next) => {
    const requestBody = util.inspect(req.body); // to show data instead of undefined
    logEvents(`${req.method}\t${req.url}\t${requestBody}`, 'reqlog.log');
    next();
}

module.exports = { logger, logEvents }