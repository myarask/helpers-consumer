import { createMuiTheme, darken, fade } from '@material-ui/core/styles';
import deepmerge from 'deepmerge';

const PRIMARY_COLOR = '#12B3B3';
const SECONDARY_COLOR = '#4d4d4d';

const theme = deepmerge(createMuiTheme(), {
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      light: fade(PRIMARY_COLOR, 0.1),
      dark: darken(PRIMARY_COLOR, 0.1),
      contrastText: '#fff',
      borderColor: '#D8D8D8',
    },
    secondary: {
      main: SECONDARY_COLOR,
      light: fade(SECONDARY_COLOR, 0.1),
      dark: darken(SECONDARY_COLOR, 0.1),
      contrastText: '#fff',
    },
    colors: {
      green: PRIMARY_COLOR,
      lightGrey: '#F8F8F8',
      boulder: '#787878',
      scorpion: '#5C5C5C',
      emperor: '#4F4242',
      error: '#D20117',
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
        height: '50px',
        width: '250px',
      },
      text: {
        color: PRIMARY_COLOR,
      },
      contained: {
        borderRadius: '1000px',
      },
      outlined: {
        borderRadius: '1000px',
        background: 'white',
      },
      containedPrimary: {
        color: 'white',
      },
    },
    MuiCardActionArea: {
      root: {
        '&:hover $focusHighlight': {
          opacity: 0,
        },
      },
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiSvgIcon: {
      colorSecondary: {
        color: 'white',
      },
    },
  },
  typography: {
    h1: {
      fontFamily: 'Quicksand, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: '1.625rem',
    },
    h2: {
      fontFamily: 'Quicksand, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.625rem',
    },
    h3: {
      fontFamily: 'Quicksand, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.25rem',
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Quicksand, Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '1rem',
      lineHeight: '1.25rem',
    },
    body1: {
      fontFamily: 'Quicksand, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.125rem',
    },
    body2: {
      fontFamily: 'Quicksand, Helvetica, Arial, sans-serif',
      fontSize: '0.875rem',
      lineHeight: '1rem',
    },
  },
});

export default theme;
