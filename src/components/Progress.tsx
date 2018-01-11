import * as React from 'react'

export default class extends React.Component {
    state
    props: ProgressProps
    constructor(props) {
        super(props)
        this.state = {}
    }
    onChange (e) {
        const bounds = e.target.getBoundingClientRect()
        const left = e.clientX
        const percent = (left - bounds.left) * 100 / bounds.width
        const { onChange } = this.props
        onChange && onChange(percent)
    }
    render () {
        const {
            className = 'progress is-primary',
            value = 100,
            max = 100
        } = this.props
        return <progress onClick={this.onChange.bind(this)} className={className} value={value} max={max}>{value}%</progress>
    }
}