import React, { Component } from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import { arrayMove} from 'react-sortable-hoc';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 63px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

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

  handleSubmit(paletteName){
    const newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors 
    }
    this.props.savePalette(newPalette);
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
    console.log(paletteIsFull, colors.length)
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
          <div>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={this.clearColors}>
                Clear Palette
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
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