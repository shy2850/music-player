import y_playlist_str from './playlistdata'
import { dispatch, getState } from '../store'
import * as $ from 'wfquery'

export const STORE_KEY = {
    LIST: 'y_playlist',
    CURRENT: 'y_current',
    PROGRESS: 'y_progress'
}
let y_playlist = localStorage.getItem(STORE_KEY.LIST)
let y_current = localStorage.getItem(STORE_KEY.CURRENT)
let y_progress = localStorage.getItem(STORE_KEY.PROGRESS)
try {
    y_playlist = JSON.parse(y_playlist)
} catch (e) {
    y_playlist = null
}
if (!y_playlist) {
    localStorage.setItem(STORE_KEY.LIST, y_playlist_str)
}

export const init = () => dispatch(getState => {
    let n = getState().merge({
        list: JSON.parse(y_playlist_str),
        current: Number(y_current) || 0,
        progress: Number(y_progress) || 0
    })
    return n
})

export const changeSong = (current) => {
    localStorage.setItem(STORE_KEY.CURRENT, current + '')
    localStorage.setItem(STORE_KEY.PROGRESS, '0')

    const song = getState().getIn(['list', current]).toJS()
    $.jsonp('https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg', {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 0,
        songmid: song.songmid,
        filename: `C400${song.songmid}.m4a`,
        guid: 1392841634
    }, function (res) {
        console.log(res)
    })

    dispatch(() => getState().merge({
        current,
        progress: 0
    }))
}
