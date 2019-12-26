import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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
      open: "form",
      newPaletteName: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
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

  savePalette(){
    this.setState({
      open: "emoji"
    })
  }

  addEmoji(emoji){
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    }
    this.props.handleSubmit(newPalette)
  }

  render(){  
    const { open, newPaletteName} = this.state;
    const { hideForm } = this.props;
    return (
      <div>
        <Dialog 
          open={open === "emoji"} 
          onClose={hideForm}>
          <DialogTitle id="emoji-dialog-title">Choose a Palette Emoji</DialogTitle>
          <Picker onSelect={this.addEmoji} title='Pick up your palette emoji'/>
        </Dialog>
          <Dialog 
            open={open === "form"} 
            onClose={hideForm} 
            aria-labelledby="form-dialog-title">
          <ValidatorForm 
                onSubmit={this.savePalette}>
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
            <DialogActions>
              <Button 
                onClick={hideForm} 
                color="primary">
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
        </div>
    );
  }
}

export default PaletteMetaForm;