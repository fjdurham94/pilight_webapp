import React, { Component } from 'react';
import { Grommet, Box, ResponsiveContext, Button, Text, TextInput } from 'grommet';
import { CirclePicker } from 'react-color';
import request from 'request';

import config from './config';
import AppBar from './components/AppBar';

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
        request.get(config.url + '/alarm', this.alarmCallback.bind(this));
    }

    alarmCallback(err, res) {
        if (!err && res.statusCode == 200) {
            const body = JSON.parse(res.body);
            console.log('success', body);
            this.setState({ alarm: body.alarm });
        } else {
            console.log('error: ', res);
        }
    }

    clickedOn() {
        console.log('Switching lights on');
        request.post(config.url + '/lights/on', (res) => {
            if (res.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error: ', res);
            }
        });
    }

    clickedOff() {
        console.log('Switching lights off');
        request.post(config.url + '/lights/off', (res, err) => {
            if (res.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error: ', res);
            }
        });
    }

    colourChange = (colour) => {
        console.log('Colour: ', colour.rgb);
        request.post({ url: config.url + '/lights', json: colour.rgb }, (res, err) => {
            if (res.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error: ', res);
            }
        });
    }

    updateAlarmHour(e) {
        const hour = e.target.value;
        const alarm = this.state.alarm;
        alarm.hour = parseInt(hour);
        request.post({
            url: config.url + '/alarm',
            json: { alarm }
        }, (err ,res) => {
            if (!err && res.statusCode == 200) {
                this.setState({ alarm });
            }
        });
    }

    updateAlarmMin(e) {
        const minute = e.target.value;
        const alarm = this.state.alarm;
        alarm.minute = parseInt(minute);
        request.post({
            url: config.url + '/alarm',
            json: { alarm }
        }, (err ,res) => {
            if (!err && res.statusCode == 200) {
                this.setState({ alarm });
            }
        });
    }

    render () {
        const alarm = this.state.alarm
        return (<Grommet theme={ THEME } full>
            <Box fill>
                <AppBar title='Daylightr'/>
                <ResponsiveContext.Consumer flex align='center' justify='center'>
                { (size) => (
                    <Box align='center' margin='large'>
                        <Box width='100%' direction='row' gap='xlarge' margin='large' height='medium'>
                            <Button style={{ width: '50%', fontSize: '10em' }} label='On' onClick={ this.clickedOn }/>
                            <Button style={{ width: '50%', fontSize: '10em' }} label='Off' onClick={ this.clickedOff }/>
                        </Box>
                        <Box width='80%' direction='row'>
                            <CirclePicker width='auto' circleSize={ 100 } onChange={ this.colourChange }/>
                        </Box>
                        <Box width='17rem' direction='row' margin='large' style={{ fontSize: '5rem' }}>
                            <TextInput value={alarm.hour.toString()} onChange={this.updateAlarmHour.bind(this)}></TextInput>
                            <Text style={{ fontSize: '5rem', alignSelf: 'center' }}>:</Text>
                            <TextInput value={alarm.minute.toString()} onChange={this.updateAlarmMin.bind(this)}></TextInput>
                        </Box>
                    </Box>
                ) }
                </ResponsiveContext.Consumer>
            </Box>
        </Grommet>);
    }
}