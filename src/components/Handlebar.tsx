import * as React from 'react'

export const PlayWay = ['循环', '逆序', '随机', '单曲']
export const PlayStatus = ['播放', '暂停']
export default class extends React.Component {
    props
    render () {
        const {
            way,
            status,
            togglePlay,
            changeWay,
            next
        } = this.props

        return <div className="tags has-addons">
            <span className="tag is-dark" onClick={changeWay}>{PlayWay[way]}</span>
            <span className={!!status ? 'tag' : 'tag is-info'} onClick={togglePlay}>{PlayStatus[status]}</span>
            <span className="tag is-primary" onClick={next}>下一首</span>
        </div>
    }
}
