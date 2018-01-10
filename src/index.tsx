import * as React from 'react'
import { render } from 'react-dom'
import { init } from './store'
import Progress from './containers/Progress'
import Panel from './containers/Panel'

init({
    progress: 50
})
render(
    [
        <Panel key="1"/>,
        <Progress key="2"/>
    ],
    document.getElementById('app')
)
