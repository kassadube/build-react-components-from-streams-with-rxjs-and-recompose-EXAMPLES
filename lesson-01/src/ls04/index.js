import React, { Component } from 'react';
import { render } from "react-dom"
import { Observable, interval  } from "rxjs"
import { ajax } from "rxjs"
import config from "recompose/rxjsObservableConfig"
import {
  setObservableConfig,
  componentFromStream,
  createEventHandler
} from "recompose"

setObservableConfig(config);



const SimpleForm = ({ text, onInput }) => (
  <div>
    <input type="text" onInput={onInput} />
    <h2>{text}</h2>
  </div>
)

const SimpleFormStream = componentFromStream(
  props$ => {
    const {
      stream: onInput$,
      handler: onInput
    } = createEventHandler()

    const text$ = onInput$
      .map(e => e.target.value)
      .delay(2500)
      .startWith("")

    return text$
      .map(text => ({ text, onInput }))
      .map(SimpleForm)
  }
)


const App04 = SimpleFormStream;
export default App04;