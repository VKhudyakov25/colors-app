import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends Component {
  constructor(props){
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
  }

  deletePalette(e){
    e.stopPropagation();
    this.props.handleDelete(this.props.id);
  }

  goToPalette(e){
    this.props.handleClick(this.props.id);
  }
  render(){
    const { classes, paletteName, colors, emoji } = this.props;
    console.log("RENDERING: ", paletteName );
    
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{backgroundColor: color.color}}
        key={color.name}
      >
      </div>
    ));
    return (
      <div className = {classes.root} onClick={this.goToPalette}>
          <DeleteIcon 
            className={classes.deleteIcon}
            style={{ transition: "all 0.5s ease-in-out" }}
            onClick={this.deletePalette}
          />

          <div className= {classes.colors}>{miniColorBoxes}</div>
          <h5 className={classes.title}>
            {paletteName} <span className={classes.emoji}>{emoji}</span>
          </h5>
      </div>
    )
  }
}

export default withStyles(styles)(MiniPalette);