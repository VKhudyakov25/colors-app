import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
      newPaletteName: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    ));
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){  
    const { open, newPaletteName} = this.state;
    const { handleSubmit, hideForm } = this.props;
    return (
        <Dialog 
          open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
        <ValidatorForm 
              onSubmit={() => handleSubmit(newPaletteName)}>
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your palette. Make sure it's unique!
            </DialogContentText>
              <TextValidator
                label="Palette Name" 
                value={newPaletteName}
                name="newPaletteName"
                fullWidth
                margin="normal"
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter a Palette Name", "Palette has already have"]}
              />
          </DialogContent>
          <Picker />
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              type="submit">
              Save Palette
            </Button>
          </DialogActions>
          </ValidatorForm>
        </Dialog>
    );
  }
}

export default PaletteMetaForm;