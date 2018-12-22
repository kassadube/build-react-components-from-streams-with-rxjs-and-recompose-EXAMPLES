import React, { Component, cloneElement, Children } from 'react';
import { render } from "react-dom"
import { Observable } from "rxjs"
import config from "recompose/rxjsObservableConfig"
import {
  setObservableConfig,
  componentFromStream,
  createEventHandler,
  mapPropsStream,
  compose
} from "recompose"

setObservableConfig(config);


const interval = mapPropsStream(props$ =>
  props$.switchMap(
    props => Observable.interval(1000),
    (props, count) => ({ ...props, count })
  )
)
const Counter = props => <h1>{props.count}</h1>

const CounterWithInterval = interval(Counter)

const App08 = CounterWithInterval;
export default App08;