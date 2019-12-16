import React, { Component } from 'react'
import Palette from './Palette';
import PaletteList from './PaletteList';
import SinglePaletteColors from './SinglePaletteColors';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      palettes: seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  savePalette(palette){
    this.setState({
      palettes: [...this.state.palettes, palette ]
    })
  }

  findPalette(id) {
    return this.state.palettes.find( (palette) => {
      return palette.id === id}
  )}

  render() {
    return (
      <Switch>
        <Route exact path="/palette/new" render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps}/> } />
        <Route exact path="/" render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps}/>}/>
        <Route exact path="/palette/:id" render={(routeProps) => (
          <Palette 
            palette = {
              generatePalette(this.findPalette(routeProps.match.params.id)
              )}
          />
        )}/>
        <Route 
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
          <SinglePaletteColors 
            palette = {
              generatePalette(this.findPalette(routeProps.match.params.paletteId)
              )}
            colorId={routeProps.match.params.colorId}
            />
          )}/>
      </Switch>
      
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    )
  }
}

export default App;