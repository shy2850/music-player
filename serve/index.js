const {
    out: {
        JsonOut
    },
    Route
} = require('f2e-serve')
const route = new Route()

route.on('lrc', JsonOut(require('./lrc')))

module.exports = (...args) => route.execute.apply(route, args)
