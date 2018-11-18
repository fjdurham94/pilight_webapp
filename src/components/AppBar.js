import React, { Component } from 'react';
import { Grommet, Box, Heading } from 'grommet';

const Bar = (props) => (
    <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '100' }}
    {...props}
    />
);

export default class AppBar extends Component {
    render() {
        return (<Bar>
            <Heading level='3' margin='none'>{ this.props.title }</Heading>
        </Bar>);
    }
}