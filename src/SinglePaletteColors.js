import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

class SinglePaletteColors extends Component {
  constructor(props){
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.gatherShades = this.gatherShades.bind(this);
  }

  gatherShades(palette, color){
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) 
      allColors[key].map((shade) => {
        if (shade.id === color) shades.push(shade)
      })
    console.log(shades);
    return shades.slice(1);
  }

  render() {
    const colorBoxes = this._shades.map( shade => (
      <ColorBox 
        background={shade.hex} 
        name={shade.name} 
        key={shade.name} 
        moreUrl={`/palette/${this.props.palette.id}/${shade.id}`}
        showLink={false}
      />
      ));
    console.log(colorBoxes);
    
    return (
      
      <div className="Palette">
        <h1>Single Palette Color</h1>
        <div className="Palette-colors"> {colorBoxes} </div>
    </div>
    )
  }
}

export default SinglePaletteColors;