import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

class SinglePaletteColors extends Component {
  constructor(props){
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.gatherShades = this.gatherShades.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);
    this.state = {
      format: "hex"
    }
  }

  gatherShades(palette, color){
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) 
      allColors[key].map((shade) => {
        if (shade.id === color) shades.push(shade)
      })
    return shades.slice(1);
  }

  onFormatChange(val){
    this.setState({format: val});
  }

  render() {
    const { format } = this.state;
    const { palette } = this.props;
    const colorBoxes = this._shades.map( shade => (
      <ColorBox 
        background={shade[format]} 
        name={shade.name} 
        key={shade.name} 
        moreUrl={`/palette/${palette.id}/${shade.id}`}
        hideLink
      />
      ));
    return (
      <div className="Palette">
        <Navbar handleChange={this.onFormatChange} hideSlider/>
          <h1>Single Palette Color</h1>
          <div className="Palette-colors"> {colorBoxes} </div>
        <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji}/>
    </div>
    )
  }
}

export default SinglePaletteColors;