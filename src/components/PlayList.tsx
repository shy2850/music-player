import * as React from 'react'

export default class extends React.Component {
    props: PlayListProps
    onChange (index) {
        const {
            current,
            onChange
        } = this.props
        if (onChange && index !== current) onChange(index)
    }
    componentDidMount() {
        const {
            init
        } = this.props
        init && init()
    }
    render () {
        const {
            current,
            list = []
        } = this.props
        const onChange = this.onChange.bind(this)
        return <table className="table is-hoverable">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>歌曲</th>
                    <th>歌手</th>
                    <th>时长</th>
                </tr>
            </thead>
            <tbody>
                {list.map((song, i) => <tr
                    className={current === i ? 'is-selected' : current}
                    key={`${i}`}
                    onClick={() => onChange(i)}
                >
                    <td>{i + 1}.</td>
                    <td>{song.get('songname')}</td>
                    <td>{song.get('singername')}</td>
                    <td>{song.get('playTime')}</td>
                </tr>)}
            </tbody>
        </table>
    }
}