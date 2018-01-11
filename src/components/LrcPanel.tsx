import * as React from 'react'

const secondsFormat = seconds => {
    let min = Math.floor(seconds / 60)
    let sec = seconds % 60 + 100
    return ('0' + min).slice(-2) + ':' + sec.toFixed(2).substring(1)
}

export default (props) => {
    const {
        lyric = '',
        seconds = 0
    } = props

    let currentTime = secondsFormat(seconds + 1)
    let index = 0
    const list = lyric.split(/[\n\r]/).map((line, i) => {
        let match
        if (match = line.match(/^\[(\d\d:\d\d\.\d\d)\]/)) {
            if (match[1] < currentTime) {
                index = i
            }
        }
        return line.replace(/^\[.*?\]/, '')
    })

    return <ul className="lrc-panel" style={{
        transform: `translateY(${-30 * (index - 5)}px)`
    }}>
        {list.map((line, i) => <li key={`${i}`} style={index === i ? { color: '#00d1b2' } : {}}>
            {line}
        </li>)}
    </ul>
}
