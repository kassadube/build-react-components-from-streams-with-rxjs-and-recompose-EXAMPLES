import React, { Component, cloneElement, Children } from 'react';
import { render } from "react-dom"
import { Observable } from "rxjs"
import config from "recompose/rxjsObservableConfig"
import {
  setObservableConfig,
  componentFromStream,
  createEventHandler
} from "recompose"

setObservableConfig(config);


const Counter = ({ value, onInc, onDec }) => (
  <div>
    <button onClick={onInc}>+</button>
    <h4>{value}</h4>
    <button onClick={onDec}>-</button>
  </div>
)

const WeirdCounter = ({ value, onInc, onDec }) => (
  <div>
    <span onClick={onInc}>+</span>
    <h1>{value}</h1>
    <span onClick={onDec}>-</span>
  </div>
)

const CounterStream = componentFromStream(
  props$ => {
    const {
      handler: onInc,
      stream: onInc$
    } = createEventHandler()
    const {
      handler: onDec,
      stream: onDec$
    } = createEventHandler()

    return props$.switchMap(props =>
      Observable.merge(
        onInc$.mapTo(1),
        onDec$.mapTo(-1)
      )
        .startWith(props.value)
        .scan((acc, curr) => acc + curr)
        .map(value => ({
          ...props,
          value,
          onInc,
          onDec
        }))
        .map(props =>
          Children.map(props.children, child =>
            cloneElement(child, props)
          )
        )
    )
  }
)

const App = () => (
  <div>
    <CounterStream value={3}>    
      <WeirdCounter />
      <Counter />
      <Counter />
    </CounterStream>
  </div>
)

const App07 = App;
export default App07;