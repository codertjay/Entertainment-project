import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import Acme from './fonts/Acme-Regular.ttf'


const acme = {
    fontFamily: 'Acme' ,
    fontStyle: 'normal' ,
    fontDisplay: 'swap' ,
    fontWeight: 400 ,
    src: `
    local('Acme'),
    local('fonts/Acme-Regular.ttf'),
    url(${Acme}) format('ttf')
  ` ,
    unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF' ,
};
const theme = createMuiTheme ({
    palette: {
        primary:{
            main: "#764abc"
        }
    },
    background:{
        default: "#fff"
    },

    typography: {
        fontFamily: 'Acme' ,
    } ,
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [acme] ,
            } ,
        } ,
    } ,
});
// ,  sans-serif
export default theme
