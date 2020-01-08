import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SinglePaletteColors from './SinglePaletteColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';
import Page from './Page';


class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  savePalette(palette){
    this.setState({
      palettes: [...this.state.palettes, palette ]
    }, this.syncLocalStorage)
  }

  deletePalette(id){
    this.setState(
      st => ({
        palettes: st.palettes.filter(palette => palette.id !== id)
      }), this.syncLocalStorage
    );
  }

  syncLocalStorage(){
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  findPalette(id) {
    return this.state.palettes.find( (palette) => {
      return palette.id === id}
  )}

  render() {
    const { palettes } = this.state;
    return (
      <Route render={({location}) =>(
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={500} classNames="page">
            <Switch location={location}>
              <Route exact path="/palette/new" render={(routeProps) => 
                <Page>
                  <NewPaletteForm 
                    savePalette={this.savePalette} 
                    palettes = {palettes} 
                    {...routeProps}
                  /> 
                </Page> 
              } />
              <Route exact path="/" render={(routeProps) => 
                <Page>
                  <PaletteList 
                    palettes={palettes}
                    deletePalette={this.deletePalette} 
                    {...routeProps}
                  />
                </Page>
              } />
              <Route exact path="/palette/:id" render={(routeProps) => (
                <Page>
                  <Palette 
                    palette = {
                      generatePalette(this.findPalette(routeProps.match.params.id)
                      )}
                  />
                </Page>
              )}/>
              <Route 
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <Page>
                    <SinglePaletteColors 
                      palette = {
                        generatePalette(this.findPalette(routeProps.match.params.paletteId)
                        )}
                      colorId={routeProps.match.params.colorId}
                    />
                  </Page>
                )}/>
            </Switch>
          </CSSTransition >
        </TransitionGroup>
      )}/>
      
      // <div>
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    )
  }
}

export default App;