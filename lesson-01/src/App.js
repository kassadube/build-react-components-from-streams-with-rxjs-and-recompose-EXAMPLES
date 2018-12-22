import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import App01 from './ls01';
import App02 from './ls02';
import App03 from './ls03';
import App04 from './ls04';
import App05 from './ls05';
import App06 from './ls06';
import App07 from './ls07';
import App08 from './ls08';
import App09 from './ls09';
import App10 from './ls10';
import App11 from './ls11';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">          
          <App01 />
          <App02  
          message="I'm a streaming App!"
          speed={1000}
          />
          <App03 />
          <App04 />
          <table border="1" width="80%">
            <tr>
              <td > <App05 value={3}/></td>
              <td> <App06 /> </td>
              <td> <App07 /></td>
            </tr>
          </table>
          
          <App08 />
          <App09 />
          <App10 />
          
          <div
    style={{
      marginTop: 40,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center"
    }}
  >
          <App11 />
          </div>
       
         
        </header>
      </div>
    );
  }
}

export default App;
