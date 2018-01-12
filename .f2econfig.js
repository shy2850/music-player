const { argv } = process
const build = argv[argv.length - 1] === 'build'
const onRoute = require('./serve')
const onSet = require('./serve/fixedModuleName')
module.exports = {
    onRoute,
    livereload: !build,
    build,
    useLess: true,
    gzip: true,
    include: /__include\(["'\s]*([^"'\s]+)["'\s]*(?:,["'\s]*([^"'\s]+)["'\s]*)?\)/g,
    middlewares: [
        {
            middleware: 'template',
            test: /index\.html?/
        },
        (conf) => ({
            onSet
        }),
        {
            middleware: 'typescript',
            getModuleId: pathname => pathname.replace(/^src\//, '')
        }
    ],
    buildFilter: pathname => {
        return !pathname || /^(css|src|index)/.test(pathname)
    },
    output: require('path').join(__dirname, './dist/cjs')
}
