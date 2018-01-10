const { argv } = process
const build = argv[argv.length - 1] === 'build'
module.exports = {
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
        {
            middleware: 'typescript',
            getModuleId: pathname => pathname.replace(/^src\//, '')
        }
    ],
    buildFilter: pathname => {
        return !pathname || /^(css|src|index)/.test(pathname)
    },
    output: require('path').join(__dirname, './dist')
}