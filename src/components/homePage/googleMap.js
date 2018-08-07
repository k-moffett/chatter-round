import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap';

export default class Map extends Component{
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    render() {
        return(
            <div id={'map'} />
        )
    }

}