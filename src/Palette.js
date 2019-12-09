import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

class Palette extends Component {
  constructor(props){
    super(props);
    this.state = {
      level: 500
    };
    this.onChange = this.onChange.bind(this);

  }

  onChange(level) {
    this.setState({level});
    console.log(this.state.level);
  }

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map( color => (
      <ColorBox background={color.hex} name={color.name}/>
      ));
    return (
      <div className="Palette">
        <Navbar level={level} onChange={this.onChange}/>
        {/* Navbar goes here */}
        <div className="Palette-colors"> {colorBoxes} </div>
        {/* footer eventually */}
      </div>
    );
  }
}

export default Palette;