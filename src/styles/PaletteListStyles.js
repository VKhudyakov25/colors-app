import sizes from './sizes';
import bg from './bg.svg';
export default {
  "@global": {
    ".fade-enter": {
      opacity: 0
    },
    ".fade-enter-active": {
      opacity: 1,
      transition: "opacity 500ms ease-in"
    },
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-in"
    }
  },
  root: {
    height: "100vh",
    display: "flex",
    alignItem: "start",
    justifyContent: "center",
    // background by SVGBackground.com
    backgroundColor: "#3a07aa",
    backgroundImage: `url(${bg})`,
    overflow: "scroll"
    
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "frap",
    [sizes.down("xs")]: {
      width: "70%"
    }
   },

  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white"
    }
  },
  
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "1.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1rem"
    }
  }
}
