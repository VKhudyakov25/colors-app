import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
        <Slider 
          defaultValue={level}
          min = {100}
          max = {900}
          step = {100}
          onAfterChange = {this.onChange}  
        />
        {/* Navbar goes here */}
        <div className="Palette-colors"> {colorBoxes} </div>
        {/* footer eventually */}
      </div>
    );
  }
}

export default Palette;