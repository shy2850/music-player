import * as React from 'react'
import { render } from 'react-dom'
import { init } from './store'
import Progress from './containers/Progress'
import PlayList from './containers/PlayList'
import LrcPanel from './containers/LrcPanel'
import Handlebar from './containers/Handlebar'

init()
render(
    [
        <div className="columns" key="1">
            <div className="column" style={{ height: '80vh', overflowY: 'auto' }}>
                <PlayList/>
            </div>
            <div className="column has-text-centered" style={{ height: '80vh', overflow: 'hidden' }}>
                <LrcPanel/>
            </div>
        </div>,
        <div className="columns" key= "2">
            <div className="column is-one-quarter">
                <Handlebar/>
            </div>
            <div className="column">
                <Progress/>
            </div>
        </div>
    ],
    document.getElementById('app')
)
