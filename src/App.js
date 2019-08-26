import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { CirclePicker } from 'react-color';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

import config from './config';
// import AppBar from './components/AppBar';

import './App.css';

const THEME = {
    global: {
        colors: {
            brand: '#228BE6',
        },
        font: {
            family: 'Roboto',
            size: '14px',
            height: '20px',
        },
    },
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { alarm: { hour: '', minute: '' } };
        this.updateAlarmHour.bind(this);
        this.updateAlarmMin.bind(this);
        request.get(config.ledctl_url + '/alarm', this.alarmCallback.bind(this));
    }

    alarmCallback = (err, res) => {
        if (!err && res.statusCode == 200) {
            const body = JSON.parse(res.body);
            console.log('success', body);
            this.setState({ alarm: body.alarm });
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
        const alarm = this.state.alarm;
        request.post({
            url: config.ledctl_url + '/alarm',
            json: { alarm }
        }, (err ,res) => {
            if (err || res.statusCode !== 200) {
                console.log('An error happened: ', err);
            }
        });
    }

    updateAlarmHour = (e) => {
        const hour = e.target.value;
        const alarm = this.state.alarm;
        alarm.hour = parseInt(hour);
        this.setState({ alarm });
    }

    updateAlarmMin = (e) => {
        const minute = e.target.value;
        const alarm = this.state.alarm;
        alarm.minute = parseInt(minute);
        this.setState({ alarm });
    }

    render () {
        const alarm = this.state.alarm
        return (
            <div fill>
                <div title='Daylightr'/>
                    <div align='center' margin='large'>
                        <div width='100%' direction='row' gap='xlarge' margin='large' height='medium'>
                            <Button style={{ width: '50%', fontSize: '10em' }} label='On' onClick={ this.clickedOn }/>
                            <Button style={{ width: '50%', fontSize: '10em' }} label='Off' onClick={ this.clickedOff }/>
                        </div>
                        <div width='80%' direction='row'>
                            <CirclePicker width='auto' circleSize={ 100 } onChange={ this.colourChange }/>
                        </div>
                        <div width='17rem' direction='row' margin='large' style={{ fontSize: '5rem' }}>
                            <TextField value={alarm.hour.toString()}
                                onChange={this.updateAlarmHour}
                                onBlur={ this.saveAlarm } />
                            <span style={{ fontSize: '5rem', alignSelf: 'center' }}>:</span>
                            <TextField value={alarm.minute.toString()}
                                onChange={this.updateAlarmMin}
                                onBlur={ this.saveAlarm } />
                        </div>
                    </div>
            </div>
        );
    }
}