const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs')
const lrc = require('./lrc')

const { join } = require('path')

if (!existsSync(join(__dirname, '../dist'))) {
    mkdirSync(join(__dirname, '../dist'))
}
if (!existsSync(join(__dirname, '../dist/lrc'))) {
    mkdirSync(join(__dirname, '../dist/lrc'))
}

const list = JSON.parse(
    readFileSync(join(__dirname, '../src/reducers/playlistdata.ts')).toString()
        .replace(/^[^']*'(.*?)'[^']*$/, '$1')
).map(({ songmid }) => {
    const url = `lrc/${songmid}.json`
    const data = lrc({ url })
    writeFileSync(join(__dirname, '../dist/' + url), JSON.stringify(data))
})

