import Progress from '../components/Progress'
import { getState, connect, dispatch } from '../store'

let i = 0
const loop = function loop () {
    i = (i + 1) % 100
    dispatch((getState) => getState().setIn(['progress'], i))
    setTimeout(loop, 100)
}
setTimeout(loop, 10000)

export default connect((getState) => {
    return {
        value: getState().getIn(['progress'])
    }
})(Progress)