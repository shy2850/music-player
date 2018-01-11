import y_playlist_str from './playlistdata'
import { dispatch, getState } from '../store'
import * as $ from 'wfquery'

export const STORE_KEY = {
    LIST: 'y_playlist',
    CURRENT: 'y_current',
    PROGRESS: 'y_progress',
    GUID: 'pgv_pvid',
    CID: 'cid'
}
let y_playlist = localStorage.getItem(STORE_KEY.LIST)
let y_current = localStorage.getItem(STORE_KEY.CURRENT)
let y_progress = localStorage.getItem(STORE_KEY.PROGRESS)
let y_guid = localStorage.getItem(STORE_KEY.GUID) || 1392841634
let y_cid = localStorage.getItem(STORE_KEY.CID) || 205361747
try {
    y_playlist = JSON.parse(y_playlist)
} catch (e) {
    y_playlist = null
}
if (!y_playlist) {
    localStorage.setItem(STORE_KEY.LIST, y_playlist_str)
    y_playlist = JSON.parse(y_playlist_str)
}

let audio = new Audio()
audio.autoplay = true
audio.addEventListener('timeupdate', function (e) {
    const progress = audio.currentTime * 100 / audio.duration
    dispatch(state => state.setIn(['seconds'], audio.currentTime))
    updateProgress(progress)
})
audio.addEventListener('ended', function (e) {
    const current = getState().getIn(['current'])
    changeSong(1 + current)
})

export const load = () => {
    const state = getState()
    const song = state.getIn(['list', state.get('current')]).toJS()
    $.jsonp('https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg', {
        g_tk: 5738,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: y_cid,
        uin: 0,
        songmid: song.songmid,
        filename: `C400${song.songmid}.m4a`,
        guid: y_guid
    }, function (res) {
        const { filename, vkey } = res.data.items[0]
        audio.src = `//dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=${y_guid}&uin=0&fromtag=66`
        audio.play()
    })
    $.ajax({
        url: '/lrc/' + song.songmid + '.json',
        success: function (data) {
            // console.log(data.lyric)
            dispatch(state => state.setIn(['lyric'], data.lyric || '歌词加载失败！'))
        },
        error: function () {
            dispatch(state => state.setIn(['lyric'], '歌词加载失败！'))
        }
    })
}

export const updateProgress = (progress) => {
    dispatch(state => state.setIn(['progress'], progress || 0))
    localStorage.setItem(STORE_KEY.PROGRESS, progress + '')
}
export const changeProgress = (progress) => {
    updateProgress(progress)
    if (audio.duration * progress) {
        audio.currentTime = audio.duration * progress / 100
    }
}

export const init = () => (dispatch(state => {
    let n = state.merge({
        list: y_playlist,
        current: (Number(y_current) || 0) % (y_playlist['size'] || 1),
        progress: Number(y_progress) || 0
    })
    return n
}), changeSong(Number(y_current) || 0))

export const changeSong = (current) => {
    const size = getState().getIn(['list']).size
    current = current % size
    localStorage.setItem(STORE_KEY.CURRENT, current + '')
    localStorage.setItem(STORE_KEY.PROGRESS, '0')
    dispatch((state) => state.merge({
        current,
        progress: 0
    }))
    load()
}
