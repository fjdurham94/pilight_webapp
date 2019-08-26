import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from "@material-ui/core";

import App from './App';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#228BE6",
        },
    }
});

ReactDOM.render(<ThemeProvider theme={ theme }><App /></ThemeProvider>, document.getElementById('app'))