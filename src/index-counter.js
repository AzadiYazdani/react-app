import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'

import Counter from "./test/counter/Counter";
import counter from "./test/counter/reducers"

const store = createStore(counter)
const rootElement = document.getElementById('root')

const render = ()=>ReactDom.render(
    <Counter
    value = {store.getState()}
    onIncrement = {()=> store.dispatch({type: 'INCREMENT'})}
    onDecrement ={() => store.dispatch({type: 'DECREMENT'})}
    onReset ={() => store.dispatch({type: 'RESET'})}
    />, rootElement
)
render()

store.subscribe(render)
