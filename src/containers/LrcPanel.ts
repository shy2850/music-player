import Panel from '../components/LrcPanel'
import { connect } from '../store'

export default connect((getState) => {
    const state = getState()
    const lyric = state.getIn(['lyric'])
    const seconds = state.getIn(['seconds'])
    return {
        lyric,
        seconds
    }
})(Panel)