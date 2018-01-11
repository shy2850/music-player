const { execSync } = require('child_process')
const lrcMap = {}

const cmd = (songmid = '002TVOQI2UiRkt') => `curl 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=${songmid}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' -H 'pragma: no-cache' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36' -H 'accept: */*' -H 'cache-control: no-cache' -H 'authority: c.y.qq.com' -H 'referer: https://y.qq.com/portal/player.html' --compressed`

const exec = (req = {}) => {
    let [lrc, songmid] = req.url.match(/[^\/\?]+/g)
    songmid = songmid.split('.')[0]
    if (lrcMap[songmid]) {
        return {
            lyric: lrcMap[songmid]
        }
    } else {
        let data = execSync(cmd(songmid))
        let jsonstring = data.toString().replace(/^MusicJsonCallback\(/, '').replace(/\)$/, '')
        let json = JSON.parse(jsonstring)
        if (json.lyric) {
            let lyric = new Buffer(json.lyric, 'base64').toString()
            lrcMap[songmid] = lyric
            return { lyric }
        } else {
            return {}
        }
    }
}
module.exports = exec