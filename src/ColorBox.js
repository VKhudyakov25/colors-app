import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles'
import chroma from 'chroma-js';
import './ColorBox.css';


const styles = {
  colorBox: {
    height: props => 
      !props.hideLink ? "25%" : "50%",
    width: '20%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    "&:hover button": {
      opacity: "1"
    }
  },
  copyText: {
    color: props => 
      chroma(props.background).luminance() >= 0.5 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"
  },
  colorName: {
    color: props =>
      chroma(props.background).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
  },
  seeMore: {
    color: props => 
      chroma(props.background).luminance() >= 0.5 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: props => 
      chroma(props.background).luminance() >= 0.5 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: "0"
    }
  };
class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
    this.changeCopyState = this.changeCopyState.bind(this);
  }


  changeCopyState() {
    this.setState({ copied: true}, () => {
      setTimeout( () =>
        this.setState({ copied: false}), 1500);
    });
  }


  render() {
    const { background, name, moreUrl, hideLink, classes } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.colorBox} style={{background}}>
          <div className={`copy-overlay ${copied && "show"}`} style={{background}}></div>
          <div className={`copy-msg ${copied && "show"}`}>
              <h1 className={classes.copyText}>Copied!</h1>
              <p className={classes.copyText}>{background}</p>
            </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {!hideLink &&
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>    
            </Link>
          }
        </div>
      </CopyToClipboard>
    )
  }
}


export default withStyles(styles)(ColorBox);
