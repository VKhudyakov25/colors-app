import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
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
    for (let key in allColors)  {
      shades = shades.concat(
        allColors[key].filter(shade => shade.id === color)
      ); 
    }
    return shades.slice(1);
  }

  onFormatChange(val){
    this.setState({format: val});
  }

  render() {
    const { format } = this.state;
    const { emoji, paletteName, id } = this.props.palette;
    const colorBoxes = this._shades.map( shade => (
      <ColorBox 
        background={shade[format]} 
        name={shade.name} 
        key={shade.name} 
        moreUrl={`/palette/${id}/${shade.id}`}
        hideLink
      />
      ));
    return (
      <div className="SingleColorPalette Palette">
        <Navbar handleChange={this.onFormatChange} hideSlider/>
          <div className="Palette-colors"> 
            {colorBoxes} 
            <div className="go-back ColorBox">
              <Link className="go-backBtn" to={`/palette/${id}`}>GO BACK</Link>
            </div>
          </div>
          
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
    </div>
    )
  }
}

export default SinglePaletteColors;