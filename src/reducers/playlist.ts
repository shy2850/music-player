import y_playlist_str from './playlistdata'
import { dispatch, getState } from '../store'
import * as $ from 'wfquery'

export const STORE_KEY = {
    LIST: 'y_playlist',
    CURRENT: 'y_current',
    PROGRESS: 'y_progress',
    GUID: 'pgv_pvid',
    CID: 'cid',
    WAY: 'play_way',
    STATUS: 'play_status'
}
let y_playlist = localStorage.getItem(STORE_KEY.LIST)
let y_current = localStorage.getItem(STORE_KEY.CURRENT)
let y_progress = localStorage.getItem(STORE_KEY.PROGRESS)
let y_way = localStorage.getItem(STORE_KEY.WAY) || 0
let y_status = localStorage.getItem(STORE_KEY.STATUS) || 0
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
audio.autoplay = false
audio.addEventListener('timeupdate', function (e) {
    const progress = audio.currentTime * 100 / audio.duration
    dispatch(state => state.setIn(['seconds'], audio.currentTime))
    updateProgress(progress)
})
export const next = () => {
    const state = getState()
    const current = state.getIn(['current'])
    const way = state.getIn(['way'])
    const length = state.getIn(['list']).size
    switch (way) {
        case 0:
            changeSong(1 + current)
            break
        case 1:
            changeSong(length + current - 1)
            break
        case 2:
            changeSong(Math.random() * length | 0)
            break
        case 3:
            changeSong(current)
            break
    }
}
audio.addEventListener('ended', next)


export const load = () => {
    const state = getState()
    const song = state.getIn(['list', state.get('current')]).toJS()
    const progress = state.getIn(['progress'])
    const status = state.getIn(['status'])
    document.title = song.songname
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
        setTimeout(function() {
            if (progress) {
                changeProgress(progress)
            }
            if (!status) {
                audio.play()
            }
        }, 500);
    })
    $.ajax({
        url: 'lrc/' + song.songmid + '.json',
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

export const togglePlay = () => {
    let status
    if (audio.paused) {
        audio.play()
        status = 0
    } else {
        audio.pause()
        status = 1
    }
    dispatch(state => state.setIn(['status'], status))
    localStorage.setItem(STORE_KEY.STATUS, status + '')
}

export const changeWay = () => {
    let way = Number(getState().getIn(['way'])) || 0
    way = (way + 1) % 4
    dispatch(state => state.setIn(['way'], way))
    localStorage.setItem(STORE_KEY.WAY, way + '')
    
}

export const init = () => (dispatch(state => {
    let n = state.merge({
        list: y_playlist,
        current: (Number(y_current) || 0) % (y_playlist['size'] || 1),
        progress: Number(y_progress) || 0,
        way: Number(y_way),
        status: Number(y_status)
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
