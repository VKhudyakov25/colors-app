import React, { Component } from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import { arrayMove} from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles';
class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props){
    super(props);
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors
    }
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false
    });
  };


  addNewColor(currentColor, newColorName){
    const newColor = {
      color: currentColor,
      name: newColorName
    };
    this.setState({
      colors: [...this.state.colors, newColor]
    });
  }

  addRandomColor(){
    const allColors = this.props.palettes.map(palette => palette.colors).flat()
    const random = Math.floor(Math.random() * allColors.length);
    this.setState({
      colors: [...this.state.colors, allColors[random]]
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clearColors(){
    this.setState({
      colors: []
    })
  }

  handleSubmit(palette){
    palette.id = palette.paletteName.toLowerCase().replace(/ /g, "-");
    palette.colors = this.state.colors; 
    this.props.savePalette(palette);
    this.props.history.push("/");
  }

  handleRemove(colorName){
    this.setState({
      colors: this.state.colors.filter( color => 
        color.name !== colorName
      )
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render(){
    const { classes, maxColors, palettes } = this.props; 
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
      <PaletteFormNav 
        open={open} 
        handleDrawerOpen={this.handleDrawerOpen} 
        palettes={palettes} 
        handleSubmit={this.handleSubmit}/>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
            <div className={classes.buttons}>
            <Button 
              variant="contained" 
              color="secondary" 
              className={classes.button}
              onClick={this.clearColors}>
                Clear Palette
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button}
              disabled={paletteIsFull}
              onClick={this.addRandomColor}>
                Random Color
            </Button>
          </div>
          <ColorPickerForm 
            paletteIsFull={paletteIsFull} 
            updateColor={this.updateColor} 
            addNewColor={this.addNewColor} 
            colors={colors}/>
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
            colors={colors} 
            handleRemove={this.handleRemove}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}
export default withStyles(styles, {withTheme: true})(NewPaletteForm);