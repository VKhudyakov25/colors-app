import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPallete from './MiniPalette'

class PaletteList extends Component {
  render() {
    const { palettes } = this.props
    return (
      <div>
        <h1>React Colors</h1>
          {palettes.map((palette) => (
            <Link to={`/palette/${palette.id}`}>
              <MiniPallete {...palette}/>
            </Link>
          ))}
      </div>
    )
  }
}

export default PaletteList;