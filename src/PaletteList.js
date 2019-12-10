import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPallete from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import { tsObjectKeyword } from '@babel/types';

const styles = {
  root: {
    backgroundColor: "blue",
    height: "100%",
    display: "flex",
    alignItem: "start",
    justifyContent: "center"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "frap"
   },

  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white"
  },
  
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%"
  }
}

class PaletteList extends Component {
  render() {
    const { palettes, classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
          </nav>
          <div className={classes.palettes}>
            {palettes.map((palette) => (
              <Link to={`/palette/${palette.id}`}>
                <MiniPallete {...palette}/>
              </Link>
            ))}
          </div>
        </div>  
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);