import React, { Component } from 'react';
import { Grommet, Box, ResponsiveContext, Button, Text } from 'grommet';
import request from 'request';

import AppBar from './components/AppBar';

const theme = {
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
    clickedOn() {
        console.log('Switching lights on');
        request.post('http://localhost:8081/lights/on', (res) => {
            if (res.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error: ', res);
            }
        });
    }

    clickedOff() {
        console.log('Switching lights off');
        request.post('http://localhost:8081/lights/off', (res, err) => {
            if (res.statusCode == 200) {
                console.log('success');
            } else {
                console.log('error: ', res);
            }
        });
    }

    render () {
        return (<Grommet theme={ theme } full>
            <Box fill>
                <AppBar title='Daylightr'/>
                <ResponsiveContext.Consumer flex align='center' justify='center'>
                { (size) => (
                    <Box align='center' margin='large'>
                        <Text size='xxlarge'>Light it up</Text>
                        <Box width='100%' direction='row' gap='xlarge' margin='large' height='medium'>
                            <Button style={{ width: '50%', fontSize: '10em' }} label='On' onClick={ this.clickedOn }/>
                            <Button style={{ width: '50%', fontSize: '10em' }} label='Off' onClick={ this.clickedOff }/>
                        </Box>
                    </Box>
                ) }
                </ResponsiveContext.Consumer>
            </Box>
        </Grommet>);
    }
}