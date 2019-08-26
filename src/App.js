import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { CirclePicker } from 'react-color';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

import config from './config';
import AppBar from './components/AppBar';

import './App.css';

const style = (theme) => ({
    pageContainer: {
        height: '100%',
        margin: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    powerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    powerButton: {
        width: '45%',
        fontSize: '7rem',
    },
    timeInput: {
        fontSize: '8rem',
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { alarm: '' };
        request.get(config.ledctl_url + '/alarm', this.alarmCallback.bind(this));
    }

    alarmCallback = (err, res) => {
        if (!err && res.statusCode == 200) {
            const body = JSON.parse(res.body);
            console.log('success', body);
            const alarm = body.alarm.hour.toString() + ':' + body.alarm.minute.toString();
            this.setState({ alarm });
        } else {
            console.log('error: ', res);
        }
    }

    clickedOn = () => {
        console.log('Switching lights on');
        request.post(config.ledctl_url + '/lights/on', (err, res) => {
            if (res.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error: ', res);
            }
        });
    }

    clickedOff = () => {
        console.log('Switching lights off');
        request.post(config.ledctl_url + '/lights/off', (err, res) => {
            if (res.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error: ', res);
            }
        });
    }

    colourChange = (colour) => {
        console.log('Colour: ', colour.rgb);
        request.post({ url: config.ledctl_url + '/lights', json: colour.rgb }, (err, res) => {
            if (res.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error: ', res);
            }
        });
    }

    saveAlarm = () => {
        const alarmSplit = this.state.alarm.split(':');
        const alarm = {
            hour: alarmSplit[0],
            minute: alarmSplit[1],
        }
        request.post({
            url: config.ledctl_url + '/alarm',
            json: { alarm }
        }, (err ,res) => {
            if (err || res.statusCode !== 200) {
                console.log('An error happened: ', err);
            }
        });
    }

    updateAlarm = (evt) => this.setState({ alarm: evt.target.value });

    render () {
        const { classes } = this.props;
        const { alarm } = this.state;

        return (
            <React.Fragment>
                <AppBar
                    title='Daylightr'/>
                    <div className={ classes.pageContainer + ' child-margins' }>
                        <div className={ classes.powerContainer }>
                            <Button
                                variant='outlined'
                                className={ classes.powerButton } 
                                onClick={ this.clickedOn }>
                                ON
                            </Button>
                            <Button
                                variant='outlined'
                                className={ classes.powerButton }
                                onClick={ this.clickedOff }>
                                OFF
                            </Button>
                        </div>
                        <CirclePicker
                            width='43rem'
                            circleSize={ 100 }
                            onChange={ this.colourChange }/>
                        <TextField
                            type='time'
                            value={ alarm }
                            onChange={ this.updateAlarm }
                            InputProps={{
                                className: classes.timeInput,
                            }}
                            onBlur={ this.saveAlarm } />
                    </div>
            </React.Fragment>
        );
    }
}

export default withStyles(style)(App);