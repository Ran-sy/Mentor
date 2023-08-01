const allowOrigin = require("./allowOrigins")

const corsOptions = {
    origin: (origin, callback) => {
        if (allowOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('found error in cors'))
        }
    }
}

module.exports = corsOptions