import React, { Component } from 'react';
import { render } from "react-dom"
import { Observable, interval  } from "rxjs"
import { ajax } from "rxjs"
import config from "recompose/rxjsObservableConfig"
import {
  setObservableConfig,
  componentFromStream
} from "recompose"

setObservableConfig(config);

const personById = id =>
  `https://swapi.co/api/people/${id}`

const Card = props => (
  <div>
    <span>{props.name}</span>
    <span>, {props.homeworld}</span>
  </div>
)

const loadById = id =>
  Observable.ajax(personById(id))    
    .pluck("response")
     .switchMap(
      response =>
        Observable.ajax(response.homeworld)          
          .pluck("response")
          .startWith({ name: "" }),
      (person, homeworld) => ({
        ...person,
        homeworld: homeworld.name
      })
    )
  

const CardStream = componentFromStream(props$ =>
  props$          
    .switchMap(props => loadById(props.id))  
    .do(console.log(props$))    
    .map(Card)
)

const App = () => (
  <div>
    <Card name="John" homeworld="Earth" />
    <CardStream id={1} />
    <CardStream id={12} />
    <CardStream id={10} />
    <CardStream id={24} />
  </div>
)
const App03 = App;
export default App03;