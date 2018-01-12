const { relative } = require('path')
const REG_IMPORT = /(import.*?from[^\w-\/.]+)([.\w-\/]+)/g
const CODE_PRE = `
let exports = {};
let module = {exports};
`
module.exports = (pathname, data, store) => {
    if (/\.tsx?$/.test(pathname)) {
        return data.toString().replace(REG_IMPORT, (mat, before, moduleId) => {
            if (!/^[.\/]/.test(moduleId)) {
                moduleId = './' + relative(pathname.replace(/[^\/]+$/, ''), 'src/' + moduleId)
            }
            return before + moduleId + '.js'
        })
    }
    if (/\.js$/.test(pathname)) {
        let modules = {}
        data = data.toString().replace(/\brequire\(['"\s]*([\w\-]+)['"\s]*\)/g, function (k, id) {
            modules[id] = 1
            let md = 'module$' + Object.keys(modules).length
            return md + `['default'] || ` + md
        })
        if (/module\.exports/.test(data)) {
            return Object.keys(modules).map((k, i) => `import * as module$${i + 1} from "./${k}.js"`).join(';\n')
                + ';\n' + CODE_PRE + data + 'export default module.exports'
        }
    }
}