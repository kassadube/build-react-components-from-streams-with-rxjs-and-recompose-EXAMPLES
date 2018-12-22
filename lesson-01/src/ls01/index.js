import React, { Component } from 'react';
import { render } from "react-dom"
import { Observable } from "rxjs"
import config from "recompose/rxjsObservableConfig"
import {
  setObservableConfig,
  componentFromStream
} from "recompose"


setObservableConfig(config)

const App01 = componentFromStream(props$ => {
  return Observable.interval(2000).map(i => (
    <TimeShow />
  ))
})

const TimeShow = () => {
    return <div>{new Date().toISOString()}</div>
}
export default App01;