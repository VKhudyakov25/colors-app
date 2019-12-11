import React, { Component } from 'react';
import MiniPallete from './MiniPalette';
import { withStyles } from '@material-ui/styles';


const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
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

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }
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
                <MiniPallete {...palette} handleClick={() => this.goToPalette(palette.id)} key={palette.id}/>
            ))}
          </div>
        </div>  
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);