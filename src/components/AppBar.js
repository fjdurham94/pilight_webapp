import React, { Component } from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        background: 'linear-gradient(45deg, #228BE6 30%, #FF8E53 90%)',
    },
};

class MyAppBar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <AppBar
                className={ classes.root }
                position='static'>
                <Toolbar>
                    <Typography
                        variant='h1'>
                        { this.props.title }
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(MyAppBar);