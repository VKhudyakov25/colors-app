import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
  constructor(props){
    super(props);
    this.state = {
      newPaletteName: "",
      showingForm: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showForm(){
    this.setState({
      showingForm: true
    })
  }

  hideForm(){
    this.setState({
      showingForm: false
    })
  }
  render() {
    const { classes, open, handleDrawerOpen, handleSubmit, palettes } = this.props;
    const { showingForm } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a Palette
            </Typography>
          </Toolbar>
            <div className={classes.navBtns}>
              <Link to="/">
                <Button variant="contained" color="secondary" className={classes.navBtns}>Go Back</Button>
              </Link>
              <Button variant="contained" color="primary" onClick={this.showForm} className={classes.navBtns}>
                Save
              </Button>
            </div>
        </AppBar>
        {showingForm && (
          <PaletteMetaForm 
            handleSubmit={handleSubmit} 
            palettes={palettes} 
            hideForm={this.hideForm}/>
        )}
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true })(PaletteFormNav);