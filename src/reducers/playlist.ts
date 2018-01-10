import y_playlist_str from './playlistdata'
import { dispatch, getState } from '../store'

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

window['MusicJsonCallback03126507134949308'] = function (res) {
    console.log(res)
}
const jsonp = url => {
    let script = document.createElement('script')
    script.onload = function () {
        document.body.removeChild(script)
    }
    script.src = url
    document.body.appendChild(script)
}

export const changeSong = (current) => {
    localStorage.setItem(STORE_KEY.CURRENT, current + '')
    localStorage.setItem(STORE_KEY.PROGRESS, '0')

    const song = getState().getIn(['list', current]).toJS()

    dispatch(() => getState().merge({
        current,
        progress: 0
    }))
}
