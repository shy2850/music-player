import Handlebar from '../components/Handlebar'
import { connect } from '../store'
import { togglePlay, next, changeWay } from '../reducers/playlist'

export default connect((getState) => {
    const state = getState()
    const way = state.getIn(['way'])
    const status = state.getIn(['status'])
    return {
        way,
        status,
        togglePlay,
        changeWay,
        next
    }
})(Handlebar)