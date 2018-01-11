import Progress from '../components/Progress'
import { getState, connect, dispatch } from '../store'
import { changeProgress } from '../reducers/playlist'

export default connect((getState) => {
    return {
        value: getState().getIn(['progress']),
        onChange: changeProgress
    }
})(Progress)