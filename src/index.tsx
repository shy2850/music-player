import * as React from 'react'
import { render } from 'react-dom'
import { init } from './store'
import Progress from './containers/Progress'
import PlayList from './containers/PlayList'

init({
    progress: 50
})
render(
    [
        <Progress key="1"/>,
        <div key="2" style={{height: 500, overflowY: 'auto'}}>
            <PlayList/>
        </div>
    ],
    document.getElementById('app')
)
