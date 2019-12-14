import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles'

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      format: "hex",
      open: false
    }
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  handleFormatChange(e) {
    this.setState({
      format: e.target.value,
      open: true
    }, () => this.props.handleChange(this.state.format)) 
  }

  closeSnackbar(){
    this.setState({ open: false })
  }

  render() {
    const { level, onChange, hideSlider, classes } = this.props;
    const { format } = this.state
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">reactlogopicker</Link>
        </div>
        {!hideSlider && 
        <div>
          <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider 
              defaultValue={level}
              min = {100}
              max = {900}
              step = {100}
              onAfterChange = {onChange}  
            />
          </div>
        </div> }
        <div className={classes.select}>
          <Select value = {format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
          <Snackbar 
            anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
            open={this.state.open}
            autoHideDuration={3000}
            message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            action={[<IconButton 
                        onClick={this.closeSnackbar} 
                        color="inherit"
                        key="close"
                        aria-label="close"
                     >
                        <CloseIcon/>
                     </IconButton>
            ]}
            onClose={this.closeSnackbar}
          />
        </div>
      </header>
    )
  }
}

export default withStyles(styles)(Navbar);