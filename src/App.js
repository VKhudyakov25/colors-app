import React, { Component } from 'react'
import Palette from './Palette';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>List of palettes</h1>}/>
        <Route exact path="/palette/:id" render={() => <h1>Individual palette</h1>}/>
      </Switch>
      
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    )
  }
}

export default App;