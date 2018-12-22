import React, { Component } from 'react';
import { render } from "react-dom"
import { Observable } from "rxjs"
import config from "recompose/rxjsObservableConfig"
import {
  setObservableConfig,
  componentFromStream
} from "recompose"


setObservableConfig(config)


const createTypewriter = (message, speed) =>
  Observable.zip(
    Observable.from(message),
    Observable.interval(speed),
    letter => {
      console.log(letter);
      return letter;
    }
  ).scan((acc, curr) => acc + curr)

const StreamingApp = componentFromStream(props$ =>
  props$
    .switchMap(props =>
      createTypewriter(props.message, props.speed)
    )
    .map(message => ({ message }))
    .map(ShowMessage)
)


const ShowMessage = props => (
  <div>
    <h1>{props.message}</h1>
  </div>
)
const App02 = StreamingApp;
export default App02;