import * as React from 'react'

export default class extends React.Component {
    state
    props: ProgressProps
    constructor(props) {
        super(props)
        this.state = {}
    }
    render () {
        const {
            className = 'progress is-primary',
            value = 100,
            max = 100
        } = this.props
        return <progress className={className} value={value} max={max}>{value}%</progress>
    }
}