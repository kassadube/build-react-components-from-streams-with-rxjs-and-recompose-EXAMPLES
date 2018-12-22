import React, { Component, cloneElement, Children } from 'react';
import { render } from "react-dom"
import { Observable } from "rxjs"
import * as R from "ramda"
import config from "recompose/rxjsObservableConfig"
import {
  setObservableConfig,
  componentFromStream,
  createEventHandler,
  mapPropsStream,
  compose
} from "recompose"

setObservableConfig(config);

const ToggleStream = componentFromStream(props$ => {
  const {
    handler: toggle,
    stream: toggle$
  } = createEventHandler()

  const on$ = Observable.merge(
    toggle$,
    Observable.interval(5000)
  )
    .startWith(true)
    .scan(bool => !bool)

  return props$.combineLatest(on$, (props, on) =>
    props.render({
      on,
      toggle
    })
  )
})

class Toggle extends React.Component {
  static defaultProps = { onToggle: () => {} }
  state = { on: false }
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  render() {
    return this.props.render({
      on: this.state.on,
      toggle: this.toggle
    })
  }
}

function MyToggle({ on, toggle }) {
  return (
    <button onClick={toggle}>{on ? "on" : "off"}</button>
  )
}

function App() {
  return (
    <ToggleStream
      onToggle={on => console.log("toggle", on)}
      render={({ on, toggle }) => (
        <div>
          {on ? "The button is on" : "The button is off"}
          <Switch on={on} onClick={toggle} />
          <hr />
          <MyToggle on={on} toggle={toggle} />
        </div>
      )}
    />
  )
}

/*
 *
 *
 * Below here are irrelevant
 * implementation details...
 *
 *
 */

function Switch({ on, className = "", ...props }) {
  return (
    <div className="toggle">
      <input className="toggle-input" type="checkbox" />
      <button
        className={`${className} toggle-btn ${
          on ? "toggle-btn-on" : "toggle-btn-off"
        }`}
        aria-expanded={on}
        {...props}
      />
    </div>
  )
}

const App11 = App;
export default App11;