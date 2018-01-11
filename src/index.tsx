import * as React from 'react'
import { render } from 'react-dom'
import { init } from './store'
import Progress from './containers/Progress'
import PlayList from './containers/PlayList'
import LrcPanel from './containers/LrcPanel'

init({
    progress: 50
})
render(
    [
        <Progress key="1"/>,
        <div className="columns" key="2">
            <div className="column" style={{ height: 500, overflowY: 'auto' }}>
                <PlayList/>
            </div>
            <div className="column has-text-centered" style={{ height: 500, overflow: 'hidden' }}>
                <LrcPanel/>
            </div>
        </div>
    ],
    document.getElementById('app')
)
