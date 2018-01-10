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
        <PlayList key="2"/>,
        <Progress key="3"/>
    ],
    document.getElementById('app')
)
