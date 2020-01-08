import React, { Component } from 'react';
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';
class Palette extends Component {
  constructor(props){
    super(props);
    this.state = {
      level: 500,
      format: "hex"
    };
    this.onChange = this.onChange.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);

  }

  onChange(level) {
    this.setState({level});
  }

  onFormatChange(val){
    this.setState({format: val});
  }

  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map( color => (
      <ColorBox 
        background={color[format]} 
        name={color.name} 
        key={color.name} 
        moreUrl={`/palette/${id}/${color.id}`}
      />
      ));
    return (
      <div className={classes.Palette}>
        <Navbar 
          level={level} 
          onChange={this.onChange}
          handleChange = {this.onFormatChange}
        />
        <div className={classes.PaletteColors}>{colorBoxes} </div>
        <PaletteFooter 
          paletteName={paletteName} 
          emoji={emoji}/>
      </div>
    );
  }
}

export default withStyles(styles)(Palette);