import React, { Component } from 'react';
import MiniPallete from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class PaletteList extends Component {

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }
  render() {
    const { palettes, classes, deletePalette } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} timeout={500} classNames="item">
                <MiniPallete 
                  {...palette} 
                  handleClick={() => this.goToPalette(palette.id)} 
                  key={palette.id}
                  id={palette.id} 
                  handleDelete={deletePalette}/>
              </CSSTransition>
            ))}
            </TransitionGroup>
        </div>  
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);