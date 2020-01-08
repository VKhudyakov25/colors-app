import React, { Component } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import styles from './styles/ColorPickerFormStyles';
class ColorPickerForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentColor: 'teal',
      newColorName: "",
    }
    this.updateColor = this.updateColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
    ));
    ValidatorForm.addValidationRule('isColorUnique', value => 
      this.props.colors.every(
        ({color}) => color !== this.state.currentColor
  ));
}

  updateColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { currentColor, newColorName } = this.state;
    const { paletteIsFull, addNewColor, classes } = this.props;
    return (
      <div>
        <ChromePicker 
          color={currentColor} 
          onChangeComplete = {this.updateColor} 
          className={classes.picker}/>
          <ValidatorForm onSubmit={() => { 
            addNewColor(currentColor, newColorName); 
            this.setState({ 
              newColorName: "" 
            })
          }}>
            <TextValidator 
              label="Color Name"
              value={newColorName}
              className={classes.colorNameInput}
              name="newColorName"
              variant="filled"
              margin="normal"
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['this field must me filled', 'color name must be unique', 'color already exist']}
            />
            <Button 
              variant="contained" 
              color="primary"
              className={classes.button} 
              disabled = {paletteIsFull}
              style={{backgroundColor: paletteIsFull 
                ? "grey"
                : currentColor}}
              type="submit" 
            >
              { paletteIsFull 
                ? "Palette if full" 
                : "ADD COLOR"
              }
            </Button>
          </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);