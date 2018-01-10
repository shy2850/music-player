import Progress from '../components/Progress'
import { getState, connect, dispatch } from '../store'

let i = 0
const loop = function loop () {
    i = (i + 1) % 100
    dispatch(state => state.setIn(['progress'], i))
    setTimeout(loop, 16.67)
}

loop()
export default connect((state) => {
    return {
        value: state.getIn(['progress'])
    }
})(Progress)