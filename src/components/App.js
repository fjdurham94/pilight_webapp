import React, {Component} from 'react';
import request from 'request';

export default class App extends Component {
    clickedOn() {
        console.log('Switching lights on')
        request.post('http://localhost:8081/lights/on')
    }

    clickedOff() {
        console.log('Switching lights off');
        request.post('http://localhost:8081/lights/off');
    }

    render () {
        return <div>
            <p>Light it up</p>
            <button onClick={ this.clickedOn() }>On</button>
            <button onClick={ this.clickedOff() }>Off</button>
            </div>
    }
}