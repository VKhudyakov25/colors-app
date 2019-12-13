import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/SinglePaletteStyles'

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
    const { classes } = this.props;
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
      <div className={classes.Palette}>
        <Navbar handleChange={this.onFormatChange} hideSlider/>
          <div className={classes.PaletteColors}> 
            {colorBoxes} 
            <div className={classes.goBack}>
              <Link to={`/palette/${id}`}>GO BACK</Link>
            </div>
          </div>
          
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
    </div>
    )
  }
}

export default withStyles(styles)(SinglePaletteColors);