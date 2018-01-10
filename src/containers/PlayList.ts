import PlayList from '../components/PlayList'
import { connect } from '../store'
import { init, changeSong } from '../reducers/playlist'

export default connect(getState => {
    const list = getState().getIn(['list'])
    const current = getState().getIn(['current'])
    return {
        init,
        current,
        list,
        onChange: changeSong
    }
})(PlayList)