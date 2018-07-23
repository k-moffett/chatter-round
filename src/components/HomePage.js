import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Container>
                <h1>Home Page</h1>
                <Button color="primary" onclick={(e) => {this.props.history.push('/')}} >Go to landing page.</Button>{' '}
            </Container>
        )
    }
}