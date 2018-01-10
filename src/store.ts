import { fromJS } from "immutable"
import * as React from "react"

const EF = (a, b) => ({})
let store = fromJS({})
let updateQueue:Function[] = []
export const init = (state = {}) => {
    store = fromJS(state)
}
export const getState = () => store

export const compose = (...funcs) => {
    if (funcs.length === 0) {
        return arg => arg
    } else {
        const last = funcs[funcs.length - 1]
        const rest = funcs.slice(0, -1)
        return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
    }
}

export const dispatch = function dispatch (action) {
    store = action(getState)
    updateQueue.map(f=>f())
}

export const isSameObject = (obj1, obj2) => {
    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) {
        return false
    } else if (keys1.length + keys2.length === 0) {
        return true
    }
    return !keys1.find(k => obj1[k] !== obj2[k])
}

export const connect = (mapProps = EF, mapDispatch = EF) => (Component) => class extends React.Component {
    props
    tempProps
    tempUpdate
    forceUpdate
    execProps () {
        const {props} = this
        const res1 = mapProps(getState, props)
        const res2 = mapDispatch(dispatch, res1)
        return { ...props, ...res1, ...res2 }
    }
    constructor (props) {
        super(props)
        let t = this
        t.execProps = t.execProps.bind(t)
        t.tempProps = t.execProps()
        t.tempUpdate = function () {
            let newProps = t.execProps()
            if (!isSameObject(t.tempProps, newProps)) {
                t.tempProps = newProps
                t.forceUpdate && t.forceUpdate()
            }
        }
        updateQueue.push(t.tempUpdate)
    }
    componentWillUnmount() {
        updateQueue.splice(updateQueue.indexOf(this.tempUpdate), 1)
    }
    render() {
        return <Component {...this.tempProps}/>
    }
}