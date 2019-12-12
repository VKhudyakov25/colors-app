import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

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
    const { background, name, moreUrl, hideLink } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.5;
    console.log(isLightColor);
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{background}}>
          <div className={`copy-overlay ${copied && "show"}`} style={{background}}></div>
          <div className={`copy-msg ${copied && "show"}`}>
              <h1>Copied!</h1>
              <p className={`${isLightColor ? "dark-color" : ""}`}>{background}</p>
            </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? "light-color": ""}>{name}</span>
            </div>
            <button className={`copy-button ${isLightColor ? "dark-color" : ""}`}>Copy</button>
          </div>
          {!hideLink &&
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={`see-more ${isLightColor ? "dark-color" : ""}`}>More</span>    
            </Link>
          }
        </div>
      </CopyToClipboard>
    )
  }
}


export default ColorBox;
