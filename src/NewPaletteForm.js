import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove} from 'react-sortable-hoc';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  }
  constructor(props){
    super(props);
    this.state = {
      open: true,
      currentColor: 'teal',
      newColorName: "",
      colors: this.props.palettes[0].colors
    }
    this.updateColor = this.updateColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isColorNameUnique', value => 
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
    ));
    ValidatorForm.addValidationRule('isColorUnique', value => 
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
  ));
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

  updateColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }

  addNewColor(){
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ""
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
    const { classes, maxColor, palettes } = this.props; 
    const { open, colors, currentColor, newColorName } = this.state;
    const paletteIsFull = colors.length >= maxColor;
    return (
      <div className={classes.root}>
      <PaletteFormNav 
        classes={classes} 
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
          <ChromePicker color={currentColor} onChangeComplete = {this.updateColor}/>
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
              label="Color Name"
              value={newColorName}
              name="newColorName"
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['this field must me filled', 'color name must be unique', 'color already exist']}
            />
            <Button 
              variant="contained" 
              color="primary" 
              disabled = {paletteIsFull}
              style={{backgroundColor: paletteIsFull 
                ? "grey"
                : currentColor}}
              type="submit" 
            >
              {paletteIsFull ? "Palette if full" : "ADD COLOR"}
            </Button>
          </ValidatorForm>
          
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